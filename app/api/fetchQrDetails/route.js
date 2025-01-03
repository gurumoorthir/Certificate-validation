import { prisma } from "../../../utils/prisma";

export async function GET(request) {
  try {
    // Extract unique_id from the query parameters
    const url = new URL(request.url);
    const unique_id = url.searchParams.get("unique_id");

    if (!unique_id) {
      return new Response(
        JSON.stringify({ error: "unique_id is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch user by unique_id
    const user = await prisma.user.findUnique({
        where: {
          unique_id: unique_id,
        },
      });
      
      if (user && !user.validation_status) {
        await prisma.user.update({
          where: {
            unique_id: unique_id,
          },
          data: {
            validation_status: true,
            date_of_validation: new Date(), // Correct way to get the current date
          },
        });
      }
      

    // Return user or handle not found case
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
