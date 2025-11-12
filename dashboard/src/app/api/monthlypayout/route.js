export async function GET() {
  return Response.json(
    { 
    cards: {
        totalComplete: 48,
        totalReported: 286.5,
        totalVerified: 286.5,
        totalCharges: 3650,
        avgHours: 35
    },
    taskStatus: {
        title: 'Task Status Summary',
        labels: ["In Progress", "Complete", "Not Started"],
        label: 'Tasks',
        dataValues: [39, 54, 7]
        },
    labourCharges: {
        title: 'Labour Charges Comparison',
        labels: ["Sept", "Oct (present)", "Nov (projected)"],
        label: 'Labour Charges ($)',
        dataValues: [4000, 4250, 5000]
        },
    hourComparison: {
        title: 'Maintenance vs Cleaning (Hours)',
        labels: ["Maintenance", "Cleaning"],
        dataValues: [75, 25]
    },
    staffItems:[
        {Staff: 'Dana', Task: 12, Hours: 670, Labour: 1200},
        {Staff: 'Dana', Task: 12, Hours: 670, Labour: 1200},
        {Staff: 'Dana', Task: 12, Hours: 670, Labour: 1200},
        {Staff: 'Dana', Task: 12, Hours: 670, Labour: 1200},
        {Staff: 'Dana', Task: 12, Hours: 670, Labour: 1200},
    ],
    categoryItems: [
        {Category: 'Maintenance', Hours: 200, Cost: 4000},
        {Category: 'Cleaning', Hours: 200, Cost: 1200},
    ]
    });
}