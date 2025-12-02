import prisma from "../../prisma/client.js"


export async function createStreak(req,res){


try{
    const userId=req.user.user_id

    const {weight,bodyFat}=req.body


    const today=new Date()
    const todayDate=new Date(today.toDateString())


    const user=await prisma.user.findUnique({
        where:{user_id:{userId}}
        
    })
    if (!user){
        return res.status(404).json({error:"User not found"})

    }



    let newStreak=1
    if (user.lastWorkout){
        const lastWorkoutDate=new Date(user.lastWorkout.toDateString())

        const diff_days=new Date(today.toDateString())

        if (diff_days==1){
            newStreak=user.streak+1

        }else if (diff_days==0){
            newStreak=user.streak
        }else{
            newStreak=1

        }

        const xpEarned=10

        await prisma.progressLog.create({
            data:{
                userId,
                date:today,
                weight,
                bodyFat
            }
        });
    
        const updateStreakXP=prisma.user.update({
            where:{user_id:{userId}
            },data:{
                xp:user.xp+xpEarned,
                streak:newStreak,
                lastWorkout:today

            }
        });

        res.json({
            message:"Workout logged successfully",
            streak:updateStreakXP.streak,
            xp:updateStreakXP.xp

        })

}}catch(err){
    return res.status(500).json({"error":"Internal Server Error"})
}
}

