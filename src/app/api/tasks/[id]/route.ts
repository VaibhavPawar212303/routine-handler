import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Handle PATCH (Update) requests
export async function PUT(
  request: Request,
  //@ts-ignore
  context: RouteContext<{ params: { id: string } }> // Ensure this matches your route configuration
) {
  try {
    const { id } = context.params; // Destructure `id` directly
    console.log(id);
    if (!id) {
      return new Response(JSON.stringify({ error: "Task ID is missing" }), {
        status: 400,
      });
    }

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
      status,
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

    const updatedTask = await prisma.task.update({
      where: { id }, // The ID is a string (adjust if needed for your DB schema)
      data: {
        task_name,
        task_description,
        start_time,
        end_time,
        water_intake: waterIntake,
        task_points: taskPoints,
        created_by,
        status: status || "Not Completed",
      },
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Failed to update task" }), {
      status: 500,
    });
  }
}
