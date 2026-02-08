# Status Codes

| Operation        | Status         |
| ---------------- | -------------- |
| GET data         | `200`          |
| POST create      | `201`          |
| PUT/PATCH update | `200` or `204` |
| DELETE           | `204`          |
| Async process    | `202`          |


# Auth Route

POST /auth/login
POST /auth/signup
POST /auth/logout
GET  /auth/me


# Profile Route

GET    /profile/me
PUT    /profile/me
DELETE /profile/me


# Restaurants Route

POST   /restaurants              (ADMIN)
GET    /restaurants              (filters)
GET    /restaurants/:id
PUT    /restaurants/:id          (ADMIN / OWNER)
DELETE /restaurants/:id          (soft delete)


# Foods Route

POST   /foods                    (ADMIN)
GET    /foods/:restaurantId
PUT    /foods/:id
DELETE /foods/:id


# Orders

POST   /orders                   (create)
GET    /orders/:id               (details)
GET    /orders/me                (user orders)
PUT    /orders/:id/cancel        (user)
PUT    /orders/:id/status        (ADMIN / RESTAURANT)

