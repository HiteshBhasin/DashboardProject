export async function GET() {
  return Response.json(
    { 
    cards: {
        totalProperties: 48,
        activeTenants: 42,
        activeLeases: 41,
        vacantUnits: 9,
        outstandingBalance: 5250,
        },
    propertyProfit: {
        title: 'Long-term Properties Profit',
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        label: 'Profit ($)',
        dataValues: [20000, 32000, 38000, 45000, 29000, 35000, 15000, 42000, 31000, 23000, 27000, 33000]
        },
    adoption: {
        title: 'Tenant Portal Adoption',
        labels: ["Missing Contact Details", "Invalid Emails", "Inactive", "Activated in Portal", "Payment Set Up",],
        dataValues: [18, 17, 10, 35, 20]
        },
    paymentStatus: {
        title: 'Payment Status Breakdown',
        labels: ["Overdue", "Late", "Paid on Time"],
        label: 'Number of Payments',
        dataValues: [14, 23, 67]
    },
    occupancy: {
        title: 'Occupancy Rate',
        labels: ["Occupied", "Vacant"],
        dataValues: [80, 20]
    },
    tenantBalance: [
        {name: 'Robert Tyler', property: '888 Spruce St.', balance: '$50'},
        {name: 'Jennifer Lee', property: '999 Willow Ave.', balance: '$100'},
        {name: 'Robert Tyler', property: '888 Spruce St.', balance: '$50'},
        {name: 'Jennifer Lee', property: '999 Willow Ave.', balance: '$100'},
    ]
    });
}