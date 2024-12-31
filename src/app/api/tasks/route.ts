import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error); // Use the error here
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const waterIntake = parseInt(body.water_intake, 10);
    const taskPoints = parseInt(body.task_points, 10);

    if (isNaN(waterIntake) || isNaN(taskPoints)) {
      return new Response(
        JSON.stringify({ error: "Invalid water_intake or task_points value" }),
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        task_name: body.task_name,
        task_description: body.task_description,
        start_time: body.start_time,
        end_time: body.end_time,
        water_intake: waterIntake,
        task_points: taskPoints,
      },
    });

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error); // Use the error here
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}
