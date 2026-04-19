import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateReview, useDeleteReview } from "@/hooks/useReviews";
import { RatingStars } from "./RatingStars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReviewSectionProps {
  productId: string;
  reviews: any[];
}

export function ReviewSection({ productId, reviews }: ReviewSectionProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createReview = useCreateReview();
  const deleteReview = useDeleteReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userReview = reviews.find((r) => r.user_id === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    createReview.mutate(
      { productId, rating, comment: comment.trim() },
      {
        onSuccess: () => {
          toast({ title: "Review submitted" });
          setRating(0);
          setComment("");
        },
        onError: (err: any) =>
          toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Customer Reviews ({reviews.length})</h3>

      {/* Submission form */}
      {!userReview && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <h4 className="font-medium">
              {user ? "Share your experience" : "Sign in to leave a review"}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Your rating:</span>
                <RatingStars value={rating} size="lg" onChange={user ? setRating : undefined} />
              </div>
              <Textarea
                placeholder="Tell others what you think about this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={!user}
                maxLength={500}
                rows={3}
              />
              <Button
                type="submit"
                disabled={createReview.isPending || (!!user && rating === 0)}
              >
                {createReview.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? "Submit Review" : "Sign In to Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews
            .slice()
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <RatingStars value={review.rating} size="sm" />
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {review.user_id === user?.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() =>
                          deleteReview.mutate(
                            { id: review.id, productId },
                            {
                              onSuccess: () => toast({ title: "Review deleted" }),
                            }
                          )
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  {review.comment && (
                    <p className="text-sm text-foreground/90">{review.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
      )}
    </div>
  );
}
