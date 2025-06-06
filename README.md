# 📊 Strategy Safari Visualizer

An interactive visualization tool built with **SvelteKit** and **Chart.js**, designed to illustrate how different strategy schools from Mintzberg's *Strategy Safari* emphasize the five P's of strategy: **Plan, Pattern, Position, Perspective, and Ploy**.

## ✨ Features

- 🕸️ Interactive radar chart
- 📚 Grouping of schools by type: *Prescriptive* and *Descriptive*
- ✅ Checkbox toggles to show/hide individual schools
- 📱 Responsive and mobile-friendly layout
- 🚀 Default display of “Design” and “Learning” schools on load

## 🧱 Project Structure

- `+page.svelte`: Main component containing logic and layout
- `static/schoolData.json`: JSON data file with school values and group labels

### Example `schoolData.json`

```json
{
  "Design": { "group": "Prescriptive", "values": [5, 2, 3, 2, 1] },
  "Planning": { "group": "Prescriptive", "values": [5, 1, 3, 2, 2] },
  "Positioning": { "group": "Prescriptive", "values": [4, 2, 5, 2, 4] },
  "Learning": { "group": "Descriptive", "values": [2, 5, 3, 4, 2] }
}
