Frontend technical challenge focused on UI and layout
-------------------------------------------------------

Architecture Overview
=====================

Home
 └── WorkOrders
      ├── Timescale selector
      ├── TimelineSchedule
      │     └── emits orderSelected(workOrder)
      └── WorkOrderDetails (side panel)
            ├── receives selected work order
            └── emits close


------------------------------------------------
Component Responsibilities
------------------------------------------------

WorkOrders
-----------
• Acts as the main container for the feature  
• Holds the selected timescale  
• Holds the currently selected workOrder  
• Coordinates communication between TimelineSchedule and WorkOrderDetails  

TimelineSchedule
----------------
• Renders the schedule grid (hours / days / weeks / months)  
• Displays work centers and work orders  
• Handles timeline layout, scrolling, and “today” indicator  
• Emits orderSelected(workOrder) when a work order is clicked  

WorkOrderDetails
----------------
• Fixed side panel displayed on the right  
• Shows work order details (name, status, start date, end date)  
• Emits close when the panel is dismissed  
• UI-focused, using mock data only (no persistence)  


------------------------------------------------
Timeline implementation
------------------------------------------------

The timeline was implemented manually, without external calendar or Gantt libraries.

This choice was made to:
• Achieve pixel-perfect alignment with the provided design  
• Maintain full control over layout, spacing, and interactions  
• Avoid unnecessary abstraction for a UI-focused challenge  

Due to time constraints, the timeline is implemented as a single component (TimelineSchedule).  
In a production scenario, it would be further split into smaller components  
(header, rows, grid, work orders).


------------------------------------------------
Date handling (Day.js)
------------------------------------------------

Day.js was chosen instead of Moment.js because:
• It is significantly lighter  
• It provides a very similar API  
• It fully covers the needs of this challenge (hours, days, weeks, months)  


------------------------------------------------
Mock data
------------------------------------------------

• Work centers and work orders are mocked  
• No real CRUD logic or persistence is implemented  
• The goal of the challenge was interpreted as UI and layout fidelity, not business logic  

Mocks are kept isolated and can easily be replaced by real API data.


------------------------------------------------
Scope & Assumptions
------------------------------------------------

This implementation focuses on:
• UI correctness  
• Layout behavior  
• Visual feedback  
• Component communication  

The following features are intentionally out of scope:
• Backend integration  
• Data persistence  
• Validation  
• Drag & drop interactions  

These could be added in a real-world implementation but were omitted to stay aligned with the challenge requirements.




# ScheduleTimeline

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
