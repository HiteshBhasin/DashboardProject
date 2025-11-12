export async function GET() {
  return Response.json(
    { 
    cards: {
        totalRequest: 48,
        completeRequest: 42,
        pendingRequest: 6,
        avgResolution: 7,
        totalCost: 5250
    },
    maintenanceExpenses: {
        title: 'Monthly Maintenance Expenses',
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        label: 'Expenses ($)',
        dataValues: [20000, 32000, 35000, 45000, 28000, 33000, 15000, 41000, 30000, 23000, 27000, 34000]
        },
    requestStatus: {
        title: 'Request Status',
        labels: ["High", "Medium", "Low"],
        dataValues: [3, 6, 12]
        },
    resolutionTime: {
        title: 'Average Resolution Time by Priority',
        labels: ["High", "Medium", "Low"],
        label: 'Days',
        dataValues: [3, 6, 12]
    },
    costPerProperty:[
        {Units: '101', Task: 2, Details: 'Kitchen Sink Leak', Cost: 500},
        {Units: '102', Task: 1, Details: 'Shower Broken', Cost: 800},
        {Units: '103', Task: 3, Details: 'Lights Broken', Cost: 80},
        {Units: '104', Task: 5, Details: 'Doorbell Broken', Cost: 50},
    ]}
    );
}