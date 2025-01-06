import { prisma } from "../../../utils/prisma";

export async function POST(request) {
  try {
    // Parse the incoming request body
    const userData = await request.json();

    // Destructure the data from the request body
    const {
      unique_id,
      name,
      email,
      mobile,
      fest_name,
      event_name,
      certification_type,
      achievement_level,
      date_of_issue,
    } = userData;

    // Check if user with the unique_id exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        unique_id: unique_id,
      },
    });

    // If the user doesn't exist, return an error response
    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Prepare data for updating (only set values that are provided)
    const dataToUpdate = {};

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (achievement_level) dataToUpdate.achievement_level = achievement_level;
    if (certification_type) dataToUpdate.certification_type = certification_type;
    if (date_of_issue) dataToUpdate.date_of_issue = new Date(date_of_issue);
    if (event_name) dataToUpdate.event_name = event_name;
    if (fest_name) dataToUpdate.fest_name = fest_name;
    if (mobile) dataToUpdate.mobile = mobile;
   
    
    
    
    

    // Update the user data in the database
    const updatedUser = await prisma.user.update({
      where: {
        unique_id: unique_id,
      },
      data: dataToUpdate, // Use the prepared data for updating
    });

    // Return a successful response with the updated user data
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    
    return new Response(JSON.stringify({ message: "Failed to update user data" }), { status: 500 });
  }
}


