// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Tenant data with camelCase keys
// const tenantData = {
//   tenant: {
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     phone: "+1 204-555-0123",
//     unit: "Unit 101",
//     address: "123 Main Street, Winnipeg, MB",
//     tenantPortalStatus: "Active",
//     emergencyContact: {
//       name: "John Smith",
//       email: "john.smith@example.com",
//       phone: "+1 204-555-0456",
//       relationship: "Spouse",
//     },
//     lease: {
//       leaseStart: "2025-01-01",
//       leaseEnd: "2025-12-31",
//       property: "Sunset Apartments",
//       securityDeposit: "$500",
//       monthlyRent: "$1200",
//     },
//   },
//   messages: [
//     { id: 1, title: "Rent Reminder", date: "2025-11-01", status: "Sent" },
//     { id: 2, title: "Maintenance Request", date: "2025-11-03", status: "Pending" },
//   ],
//   reminders: [
//     { id: 1, title: "Check Lease Renewal", date: "2025-11-15", status: "Pending" },
//     { id: 2, title: "Inspect Apartment", date: "2025-11-20", status: "Scheduled" },
//   ],
// };

// // Endpoint to get all tenant-related data
// app.get("/api/tenant", (req, res) => {
//   res.json(tenantData);
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });



// Import dependencies
const express = require("express");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = 5000;

// Enable CORS for frontend access
app.use(cors());

// Example hard-coded data
const tenantData = {
  staff: {
    name: "John Doe",
    date: "Nov 2025",
    labourType: "Full-time",
    email: "john@example.com",
  },
  workSummary: {
    ratePerHour: "$20",
    reportedHours: "35",
    timesheetHours: "34",
    totalCharges: "$680",
    variance: "-1",
    verifiedBy: "Manager A",
  },
  tenantRecords: [
    {
      Task: "Clean Lobby",
      Location: "Unit 101",
      "Reported Time": "2h",
      Timesheet: "2h",
      Status: "Completed",
    },
    {
      Task: "Fix Sink",
      Location: "Unit 203",
      "Reported Time": "1.5h",
      Timesheet: "1.5h",
      Status: "Pending",
    },
  ],
};

// Define API endpoint
app.get("/api/tenant", (req, res) => {
  res.json(tenantData);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
