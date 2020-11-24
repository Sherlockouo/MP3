import request from '@/api/neapi'

export function getTopSongs(type) {
    if(type==null){
        type=0;
    }
    return request.get('/top/song',{
        type:type
    })
}

export function getSearchSongs(key) {
    return request.get('/search',{
        params:{
            keywords:key
        }
    })
}

// /song/url?id=33894312
export function getSingleMusic(id) {
    return request.get('/song/url',{
        params:{
            id:id
        }
    })
}

