import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Request body is missing or invalid" }),
        { status: 400 }
      );
    }
    const {
      task_name,
      task_description,
      start_time,
      end_time,
      water_intake,
      task_points,
      created_by,
    } = body;
    if (
      !task_name ||
      !task_description ||
      !start_time ||
      !end_time ||
      !created_by
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields in request body" }),
        { status: 400 }
      );
    }
    const waterIntake = parseInt(water_intake, 10);
    const taskPoints = parseInt(task_points, 10);
    if (
      isNaN(waterIntake) ||
      isNaN(taskPoints) ||
      waterIntake < 0 ||
      taskPoints < 0
    ) {
      return new Response(
        JSON.stringify({
          error: "Invalid or negative water_intake or task_points value",
        }),
        { status: 400 }
      );
    }
    const newTask = await prisma.task.create({
      data: {
        task_name,
        task_description,
        start_time,
        end_time,
        water_intake: waterIntake,
        task_points: taskPoints,
        created_by,
        status: "Not Completed",
      },
    });
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}





