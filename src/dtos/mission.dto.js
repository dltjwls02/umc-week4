export const bodyToMission=(body)=>{
    return {
        store_id:body.store_id,
        title: body.title|| "",
        content:body.content|| "",
        point: body.point|| "",
        deadline: body.deadline|| ""
    };
};

export const responseFromMissioin=(data)=>{
    const{mission,store}=data;

    return {
        id:mission[0].id,
        title: mission[0].title|| "",
        content:mission[0].content|| "",
        point: mission[0].point|| "",
        deadline: mission[0].deadline|| "",
        store:(store).map((st)=>({
            id:st.id,
            name:st.name,
            location:st.location
        }))
    };
};
export const responseFromUserMissioin=(data)=>{
    const{usermission, mission,location}=data;
    console.log(usermission);
    console.log(mission);
      console.log(location);

    return {
        id:usermission[0].id,
        user_id: usermission[0].user_id,
        status:usermission[0].status,
        mission:(mission).map((ms)=>({
            id:ms.id,
            title:ms.title,
            content:ms.content
        })),
        location:(location).map((st)=>({
            id:st.id,
            name:st.name
        }))
    };
};
