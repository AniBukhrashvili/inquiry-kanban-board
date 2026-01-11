# Architecture and Design Decisions

This document explains the main architecture and design choices for the **Inquiry Kanban Board**.

## Drag-and-Drop

### Decision
Use **React DnD** with the HTML5 backend.

### Why
- Stable and widely used library
- Good TypeScript support
- Easy integration with React hooks
- Clear separation between logic and UI

### Alternatives
- **react-beautiful-dnd** – deprecated and not React 18 friendly
- **Custom solution** – too much development effort
---

## State Management

### Decision
Use **Zustand** for global state.

### Why
- Very simple and lightweight
- Less boilerplate than Redux
- Prevents unnecessary re-renders

### Store Structure
- `inquiries` – list of all inquiries
- `filters` – active filters
- `isLoading` – loading state
- actions to update data

### Alternatives
- **Redux Toolkit** – more setup and boilerplate
- **Context API** – performance issues with frequent updates

---

## Future Improvements

### Accessibility
- Screen reader support

### Testing
- Component tests

### Advanced Features
- Bulk actions
- Saved filters
- Export (CSV, PDF)

### API
- Real database
