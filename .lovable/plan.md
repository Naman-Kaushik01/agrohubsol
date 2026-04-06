

# AgroHub — Auth + Marketplace MVP Plan

## Overview
Build AgroHub's authentication system with role-based access and a full agricultural supplies marketplace, using Supabase for backend (auth, database, storage).

## Database Schema

**Tables to create via migrations:**

1. **profiles** — user_id (FK auth.users), full_name, phone, avatar_url, role (enum: farmer/contractor/supplier/expert/admin), created_at
2. **user_roles** — id, user_id (FK auth.users), role (app_role enum), unique(user_id, role)
3. **product_categories** — id, name, slug, icon, description
4. **products** — id, supplier_id (FK profiles), category_id (FK), name, description, price, unit, stock_quantity, image_url, status (active/inactive), created_at
5. **cart_items** — id, user_id, product_id, quantity, created_at
6. **orders** — id, user_id, total_amount, status (pending/confirmed/shipped/delivered/cancelled), shipping_address, created_at
7. **order_items** — id, order_id, product_id, quantity, unit_price
8. **reviews** — id, user_id, product_id, rating, comment, created_at

All tables get RLS policies. A `has_role()` security-definer function handles role checks.

**Triggers:** Auto-create profile on signup.

**Seed data:** Product categories (Seeds, Fertilizers, Pesticides, Tools, Irrigation) and sample products.

## Frontend Structure

### New Pages
- `/` — Landing page (hero, features, CTA)
- `/login` — Login form
- `/register` — Registration with role selection
- `/marketplace` — Product grid with search, category filters, sorting
- `/marketplace/:id` — Product detail page
- `/cart` — Shopping cart
- `/checkout` — Checkout flow
- `/orders` — Order history
- `/dashboard` — Role-based dashboard (supplier: manage products; farmer: orders overview)
- `/profile` — User profile management

### Key Components
- **Layout:** Navbar (with auth state, cart icon, role-based links), Footer
- **Auth:** LoginForm, RegisterForm, ProtectedRoute, AuthContext
- **Marketplace:** ProductCard, ProductGrid, CategoryFilter, SearchBar, ProductDetail
- **Cart:** CartItem, CartSummary, CheckoutForm
- **Dashboard:** SupplierProductManager, OrderList, StatsCards
- **Shared:** RatingStars, StatusBadge, LoadingSpinner, EmptyState

### State Management
- React Context for auth/user state
- TanStack Query for server data (products, orders, cart)
- Local state for UI concerns (filters, search)

## Technical Details

- **Auth:** Supabase Auth with email/password; `onAuthStateChange` listener; JWT-based session
- **Role system:** `user_roles` table + `has_role()` security-definer function; role selected at registration
- **RLS policies:** Farmers read products, manage own cart/orders; Suppliers CRUD own products; Admin full access
- **Image storage:** Supabase Storage bucket for product images
- **Styling:** Tailwind CSS + shadcn/ui components, green/earth-tone agricultural theme
- **Responsive:** Mobile-first, works on all screen sizes

## Implementation Order

1. Set up Supabase (enable auth, create all migrations, seed categories)
2. Auth context, login/register pages, protected routes
3. Landing page with navigation
4. Marketplace — product listing with filters and search
5. Product detail page
6. Cart and checkout flow
7. Order history
8. Supplier dashboard (add/edit products)
9. Profile page
10. Reviews and ratings

## Color Theme
- Primary: Green (#16a34a) — agricultural feel
- Secondary: Amber/earth tones
- Background: Warm off-white
- Cards: White with subtle shadows

