# Bloggerr – Article Platform

A simple content-driven article/blog platform built with **Django (REST API)** and **Next.js**.

---

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SQLite (local development)
* Local media storage (images)

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Tiptap (rich text editor)

---

## Project Overview

* Articles are managed via Django (admin + API)
* Images are uploaded via REST API and stored locally
* Frontend consumes content from Django API
* Supports pagination, search, create/edit/delete articles

---

## Notes

* Frontend and backend are fully decoupled
* Images are uploaded using `FormData`
* Pagination and search are handled by Django REST Framework
* Single page handles article view, edit, and create

---

## Future Improvements (Optional)

* Authentication (JWT)
* Tags / categories
* Cloud image storage (Cloudinary / S3)
* Deployment (Vercel + Render)
* SEO metadata per article

---

