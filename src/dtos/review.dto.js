export const bodyToReview=(body)=>{
    return {
        user_id:body.user_id,
        store_id:body.store_id,
        status:body.status|| "",
        title: body.title|| "",
        content:body.content|| "",
        point: body.point|| ""
    };
};

export const responseFromReview=(data)=>{
    const{review,store}=data;

    return {
        id:review[0].id,
        user_id:review[0].user_id,
        status:review[0].status|| "",
        title: review[0].title|| "",
        content:review[0].content|| "",
        point: review[0].point|| "",
        store:(store).map((st)=>({
            id:st.id,
            name:st.name,
            location:st.location
        }))
    };
};
