# Trade Connect API Documentation

**Version:** v1  
**Base URL:** `http://44.216.106.69/:8000/api/v1`  
**Format:** JSON  
**Authentication:** JWT Bearer token

Trade Connect is a farm produce marketplace API. Admins manage the product catalog, farmers, and listings. Users register and authenticate to place orders (order endpoints coming soon).

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Response Format](#response-format)
4. [Error Handling](#error-handling)
5. [Enums & Status Values](#enums--status-values)
6. [Public Endpoints](#public-endpoints)
7. [Auth Endpoints](#auth-endpoints)
8. [Admin Endpoints](#admin-endpoints)
  - [Categories](#categories)
  - [Produce](#produce)
  - [Farmers](#farmers)
  - [Listings](#listings)
9. [Typical Admin Setup Flow](#typical-admin-setup-flow)

---

Root info endpoint:

```
GET /
```

```json
{
  "message": "Trade Connect API",
  "version": "v1",
  "base_url": "http://localhost:8000/api/v1"
}
```

All API routes are prefixed with `/api/v1`.

---

## Authentication

Protected endpoints require a JWT in the `Authorization` header:

```
Authorization: Bearer {access_token}
```

Tokens are issued by `/register` and `/login`. Default expiry is **60 minutes** (`expires_in: 3600` seconds).


| Role    | Access                                  |
| ------- | --------------------------------------- |
| `admin` | Full access to all `/admin/`* endpoints |
| `user`  | Public + auth endpoints only (for now)  |


---

## Response Format

### Success — single resource

```json
{
  "data": { ... }
}
```

### Success — collection

```json
{
  "data": [ ... ]
}
```

### Success — message only

```json
{
  "message": "Category deleted."
}
```

### Auth token response

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin"
  }
}
```

---

## Error Handling

All `/api/*` errors return JSON. No stack traces are exposed. Missing or invalid JWT tokens always return `401` with `Unauthenticated.` — the API never redirects to a web login page.


| Status | Meaning                 | Example message                     |
| ------ | ----------------------- | ----------------------------------- |
| 401    | Unauthenticated         | `Unauthenticated.`                  |
| 401    | Wrong login credentials | `Invalid credentials.`              |
| 403    | Not an admin            | `Forbidden. Admin access required.` |
| 404    | Resource not found      | `Farmer not found.`                 |
| 422    | Validation failed       | `Validation failed.`                |


### Validation error (422)

```json
{
  "message": "Validation failed.",
  "errors": {
    "name": ["Farmer name is required."],
    "state": ["State is required."]
  }
}
```

### Not found (404)

```json
{
  "message": "Farmer not found."
}
```

Resource-specific not-found messages:


| Resource | Message               |
| -------- | --------------------- |
| Farmer   | `Farmer not found.`   |
| Category | `Category not found.` |
| Produce  | `Produce not found.`  |
| Listing  | `Listing not found.`  |
| User     | `User not found.`     |


---

## Enums & Status Values


| Field              | Allowed values       |
| ------------------ | -------------------- |
| `role` (user)      | `admin`, `user`      |
| `status` (farmer)  | `active`, `inactive` |
| `status` (listing) | `active`, `inactive` |


---

## Public Endpoints

### Health Check

```
GET /api/v1/health
```

**Response `200`**

```json
{
  "status": "ok",
  "service": "Trade Connect"
}
```

---

## Auth Endpoints

### Register

```
POST /api/v1/register
```

**Body**


| Field                   | Type   | Required | Rules                 |
| ----------------------- | ------ | -------- | --------------------- |
| `name`                  | string | Yes      | max 255               |
| `email`                 | string | Yes      | valid email, unique   |
| `password`              | string | Yes      | min 8 chars           |
| `password_confirmation` | string | Yes      | must match `password` |
| `role`                  | string | Yes      | `admin` or `user`     |


**Example**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password",
  "password_confirmation": "password",
  "role": "user"
}
```

**Response `201`** — returns JWT + user object (see [Auth token response](#auth-token-response)).

---

### Login

```
POST /api/v1/login
```

**Body**


| Field      | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | Yes      |
| `password` | string | Yes      |


**Example**

```json
{
  "email": "jane@example.com",
  "password": "password"
}
```

**Response `200`** — returns JWT + user object.

**Response `401`**

```json
{
  "message": "Invalid credentials."
}
```

### Current user profile

```
GET /api/v1/me
```

**Auth:** Bearer token required (admin or user).

**Response `200`**

```json
{
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "created_at": "2026-06-09T12:00:00.000000Z",
    "updated_at": "2026-06-09T12:00:00.000000Z"
  }
}
```

**Response `401`**

```json
{
  "message": "Unauthenticated."
}
```

---

## Admin Endpoints

> **Requires:** `Authorization: Bearer {admin_token}`  
> Non-admin users receive `403 Forbidden`.

---

### Categories

Product groupings such as Fruits, Vegetables, Grains.


| Method   | Endpoint                        | Description         |
| -------- | ------------------------------- | ------------------- |
| `GET`    | `/api/v1/admin/categories`      | List all categories |
| `POST`   | `/api/v1/admin/categories`      | Create category     |
| `GET`    | `/api/v1/admin/categories/{id}` | Get one category    |
| `PUT`    | `/api/v1/admin/categories/{id}` | Update category     |
| `DELETE` | `/api/v1/admin/categories/{id}` | Delete category     |


**Create / Update body**


| Field  | Type   | Required | Rules           |
| ------ | ------ | -------- | --------------- |
| `name` | string | Yes      | unique, max 255 |


**Example — create**

```json
POST /api/v1/admin/categories

{
  "name": "Vegetables"
}
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "name": "Vegetables",
    "created_at": "2026-06-09T16:21:03.000000Z",
    "updated_at": "2026-06-09T16:21:03.000000Z"
  }
}
```

**Notes**

- Listing a category includes its nested `produce` array.
- Deleting a category also deletes all produce under it.

---

### Produce

Catalog items (Rice, Beans, etc.) assigned to a category.


| Method   | Endpoint                     | Description      |
| -------- | ---------------------------- | ---------------- |
| `GET`    | `/api/v1/admin/produce`      | List all produce |
| `POST`   | `/api/v1/admin/produce`      | Create produce   |
| `GET`    | `/api/v1/admin/produce/{id}` | Get one produce  |
| `PUT`    | `/api/v1/admin/produce/{id}` | Update produce   |
| `DELETE` | `/api/v1/admin/produce/{id}` | Delete produce   |


**Create body** (`multipart/form-data`)


| Field         | Type    | Required | Rules                        |
| ------------- | ------- | -------- | ---------------------------- |
| `category_id` | integer | Yes      | must exist in `categories`   |
| `name`        | string  | Yes      | unique per category, max 255 |
| `image`       | file    | Yes      | JPEG, PNG, or WebP — max 5MB |


**Update body** (`multipart/form-data`)


| Field         | Type    | Required | Rules                                            |
| ------------- | ------- | -------- | ------------------------------------------------ |
| `category_id` | integer | Yes      | must exist in `categories`                       |
| `name`        | string  | Yes      | unique per category, max 255                     |
| `image`       | file    | No       | JPEG, PNG, or WebP — max 5MB (replaces existing) |


> Use `multipart/form-data` when creating or updating produce (not JSON), because an image file is required on create.

**Example — create (cURL)**

```bash
curl -X POST http://localhost:8000/api/v1/admin/produce \
  -H "Authorization: Bearer {token}" \
  -F "category_id=1" \
  -F "name=Rice" \
  -F "image=@/path/to/rice.jpg"
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "category_id": 1,
    "name": "Rice",
    "image": "iVBORw0KGgoAAAANSUhEUgAA...",
    "image_mime": "image/jpeg",
    "image_url": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "created_at": "2026-06-09T16:22:03.000000Z",
    "updated_at": "2026-06-09T16:22:03.000000Z"
  }
}
```

**Notes**

- Uploaded images are converted to **base64** and stored in the database.
- `image` is the raw base64 string; `image_mime` is the file type (e.g. `image/jpeg`).
- `image_url` is a ready-to-use data URI for `<img src="...">` tags.

---

### Farmers

Registered farmers who supply produce.


| Method   | Endpoint                     | Description      |
| -------- | ---------------------------- | ---------------- |
| `GET`    | `/api/v1/admin/farmers`      | List all farmers |
| `POST`   | `/api/v1/admin/farmers`      | Create farmer    |
| `GET`    | `/api/v1/admin/farmers/{id}` | Get one farmer   |
| `PUT`    | `/api/v1/admin/farmers/{id}` | Update farmer    |
| `DELETE` | `/api/v1/admin/farmers/{id}` | Delete farmer    |


**Create / Update body**


| Field          | Type   | Required | Rules                  |
| -------------- | ------ | -------- | ---------------------- |
| `name`         | string | Yes      | max 255                |
| `state`        | string | Yes      | max 255                |
| `lga`          | string | Yes      | max 255                |
| `status`       | string | Yes      | `active` or `inactive` |
| `phone_number` | string | Yes      | max 20                 |


**Example — create**

```json
POST /api/v1/admin/farmers

{
  "name": "Ibrahim Musa",
  "state": "Niger",
  "lga": "Bida",
  "status": "active",
  "phone_number": "08012345678"
}
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "name": "Ibrahim Musa",
    "state": "Niger",
    "lga": "Bida",
    "status": "active",
    "phone_number": "08012345678",
    "created_at": "2026-06-09T16:30:00.000000Z",
    "updated_at": "2026-06-09T16:30:00.000000Z"
  }
}
```

---

### Listings

Produce a farmer is selling, with price and stock.

#### All listings


| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| `GET`  | `/api/v1/admin/listings` | List all listings (all farmers) |


**Response `200`** — same shape as other listing responses (includes `produce` and `farmer`).

#### Farmer listings (create & list by farmer)


| Method | Endpoint                                     | Description            |
| ------ | -------------------------------------------- | ---------------------- |
| `GET`  | `/api/v1/admin/farmers/{farmer_id}/listings` | List farmer's listings |
| `POST` | `/api/v1/admin/farmers/{farmer_id}/listings` | Add listing for farmer |


#### Single listing (by listing id)


| Method   | Endpoint                      | Description     |
| -------- | ----------------------------- | --------------- |
| `GET`    | `/api/v1/admin/listings/{id}` | Get one listing |
| `PUT`    | `/api/v1/admin/listings/{id}` | Update listing  |
| `PATCH`  | `/api/v1/admin/listings/{id}` | Update listing  |
| `DELETE` | `/api/v1/admin/listings/{id}` | Delete listing  |


**Create / Update body**


| Field        | Type    | Required | Rules                         |
| ------------ | ------- | -------- | ----------------------------- |
| `produce_id` | integer | Yes      | must exist; unique per farmer |
| `price`      | number  | Yes      | min 0                         |
| `stock`      | integer | Yes      | min 0                         |
| `status`     | string  | Yes      | `active` or `inactive`        |


**Example — create**

```json
POST /api/v1/admin/farmers/1/listings

{
  "produce_id": 2,
  "price": 45000,
  "stock": 120,
  "status": "active"
}
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "farmer_id": 1,
    "produce_id": 2,
    "price": "45000.00",
    "stock": 120,
    "status": "active",
    "produce": {
      "id": 2,
      "name": "Rice",
      "image_url": "data:image/jpeg;base64,...",
      "category": {
        "id": 1,
        "name": "Grains"
      }
    },
    "farmer": {
      "id": 1,
      "name": "Ibrahim Musa",
      "state": "Niger",
      "lga": "Bida"
    },
    "created_at": "2026-06-09T17:00:00.000000Z",
    "updated_at": "2026-06-09T17:00:00.000000Z"
  }
}
```

**Notes**

- A farmer can only have **one listing per produce** (e.g. one Rice listing per farmer).
- Deleting a farmer removes all their listings.
- All listing responses include nested `produce` (name, image_url, category) and `farmer` details.

---

## Typical Admin Setup Flow

```
1. POST /admin/categories          →  Vegetables, Grains, Fruits
2. POST /admin/produce             →  Rice (Grains), Beans (Grains)
3. POST /admin/farmers             →  Register farmers with state & LGA
4. POST /admin/farmers/1/listings  →  Assign produce + price + stock
5. GET  /admin/listings            →  Review all active listings
```

### Example cURL sequence

```bash
# 1. Login as admin
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# 2. Create a category (use token from step 1)
curl -X POST http://localhost:8000/api/v1/admin/categories \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Grains"}'

# 3. Add produce (with image)
curl -X POST http://localhost:8000/api/v1/admin/produce \
  -H "Authorization: Bearer {token}" \
  -F "category_id=1" \
  -F "name=Rice" \
  -F "image=@/path/to/rice.jpg"

# 4. Register a farmer
curl -X POST http://localhost:8000/api/v1/admin/farmers \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ibrahim Musa","state":"Niger","lga":"Bida","status":"active","phone_number":"08012345678"}'

# 5. Add a listing
curl -X POST http://localhost:8000/api/v1/admin/farmers/1/listings \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"produce_id":1,"price":45000,"stock":120,"status":"active"}'

# 6. View all listings
curl http://localhost:8000/api/v1/admin/listings \
  -H "Authorization: Bearer {token}"
```

---

## User Listing Endpoints

> **Requires:** `Authorization: Bearer {user_token}`

Browse available farm produce listings before placing an order. Only **active** listings are returned.


| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| `GET`  | `/api/v1/listings`      | List all active listings |
| `GET`  | `/api/v1/listings/{id}` | Get one active listing   |


**Response `200`**

```json
{
  "data": [
    {
      "id": 1,
      "farmer_id": 1,
      "produce_id": 1,
      "price": "45000.00",
      "stock": 120,
      "status": "active",
      "produce": {
        "id": 1,
        "name": "Rice",
        "image_url": "data:image/jpeg;base64,...",
        "category": {
          "id": 1,
          "name": "Grains"
        }
      },
      "farmer": {
        "id": 1,
        "name": "Ibrahim Musa",
        "state": "Niger",
        "lga": "Bida"
      },
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

---

## User Order Endpoints

> **Requires:** `Authorization: Bearer {user_token}`


| Method  | Endpoint                     | Description            |
| ------- | ---------------------------- | ---------------------- |
| `GET`   | `/api/v1/orders`             | List your orders       |
| `POST`  | `/api/v1/orders`             | Place an order         |
| `GET`   | `/api/v1/orders/{id}`        | Get one of your orders |
| `PATCH` | `/api/v1/orders/{id}/cancel` | Cancel your order      |


**Create order body**


| Field        | Type    | Required | Rules                              |
| ------------ | ------- | -------- | ---------------------------------- |
| `listing_id` | integer | Yes      | must exist, listing must be active |
| `quantity`   | integer | Yes      | min 1, must not exceed stock       |


```json
POST /api/v1/orders

{
  "listing_id": 1,
  "quantity": 2
}
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "user_id": 2,
    "listing_id": 1,
    "quantity": 2,
    "total": "90000.00",
    "status": "new",
    "produce": {
      "id": 1,
      "name": "Rice",
      "image_url": "data:image/jpeg;base64,...",
      "category": {
        "id": 1,
        "name": "Grains"
      }
    },
    "created_at": "...",
    "updated_at": "..."
  }
}
```

**Order statuses:** `new`, `in_transit`, `cancelled`, `delivered`

- Users can only cancel orders with status `new`.
- Stock is reduced when an order is placed and restored when cancelled.

---

## Admin User Endpoints


| Method | Endpoint                   | Description    |
| ------ | -------------------------- | -------------- |
| `GET`  | `/api/v1/admin/users`      | List all users |
| `GET`  | `/api/v1/admin/users/{id}` | Get one user   |


**Response `200`**

```json
{
  "data": [
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

> Passwords are never included in responses.

---

## Admin Order Endpoints


| Method  | Endpoint                    | Description         |
| ------- | --------------------------- | ------------------- |
| `GET`   | `/api/v1/admin/orders`      | List all orders     |
| `GET`   | `/api/v1/admin/orders/{id}` | Get one order       |
| `PATCH` | `/api/v1/admin/orders/{id}` | Update order status |


**Update status body**


| Field    | Type   | Required | Allowed values                         |
| -------- | ------ | -------- | -------------------------------------- |
| `status` | string | Yes      | `in_transit`, `cancelled`, `delivered` |


```json
PATCH /api/v1/admin/orders/1

{
  "status": "in_transit"
}
```
