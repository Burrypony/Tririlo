export const dragStartHandler = (columnId:number, cardId: number ) => {
    return (dispatch: (arg0: { type: string; payload: { columnId: number; cardId: number } }) => void) => {
        dispatch({
            type: "dragStartHandler",
            payload: {
                columnId: columnId,
                cardId : cardId
            }
        })
    }
}

export const dropHandler = (id:number) => {
    return (dispatch: (arg0: { type: string; payload: number }) => void) => {
        dispatch({
            type: "dropHandler",
            payload: id
        })
    }
}

export const activeCard = (id:number) => {
    return (dispatch: (arg0: { type: string; payload: number }) => void) => {
        dispatch({
            type: "activeCard",
            payload: id
        })
    }
}

export const activeBoard = (id:number) => {
    return (dispatch: (arg0: { type: string; payload: number }) => void) => {
        dispatch({
            type: "activeBoard",
            payload: id
        })
    }
}