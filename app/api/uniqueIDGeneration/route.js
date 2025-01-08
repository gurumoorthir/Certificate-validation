import {  NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";



export async function POST(req) {
  try {
    const { generatedIDs } = await req.json(); // Receive userIds from the request body

    // Ensure userIds is an array and contains valid values
    if (!generatedIDs || !Array.isArray(generatedIDs) || generatedIDs.length === 0) {
      return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    // Insert all userIds into the database
    const insertedUsers = await Promise.all(
      generatedIDs.map((genId) =>
        prisma.user.create({
          data: {
            unique_id: genId.unique_id, // Insert the unique_id from the array
            name: null, // Optional, can be null
            email: null, // Optional, can be null
            mobile: null, // Optional, can be null
            fest_name: null, // Optional, can be null
            event_name: null, // Optional, can be null
            certification_type: null, // Optional, can be null
            achievement_level: null, // Optional, can be null
            date_of_issue: null, // Optional, can be null
            date_of_validation: null, // Optional, can be null
          },
        })
      )
    );

    return NextResponse.json({ message: "Users created successfully" }, { status: 201 });
  } catch (error) {
    
    return NextResponse.json({ message: `Server Error ${error}` }, { status: 500 });
  }
}







