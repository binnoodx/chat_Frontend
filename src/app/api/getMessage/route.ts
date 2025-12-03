import { dbConnect } from "@/mongo_connect/dbConnect";
import message from "@/model/messageSchema";
import { NextResponse } from "next/server";


export async function GET() {

    await dbConnect()
        const now = new Date();

    // First day of this month (00:00)
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    // First day of next month (00:00)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const searchMessage = await message.find({createdAt: {
        $gte: firstDay,
        $lt: nextMonth
      }
    }).sort({ createdAt: -1 })

    return NextResponse.json(searchMessage)
    
}