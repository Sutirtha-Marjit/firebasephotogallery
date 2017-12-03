export interface DesignItem{

    heading:string,
    description:string,
    notes:string,
    colors:Array<string>,
    type:string,
    tags:Array<string>,
    date:any,
    grade:number,
    file:string
}


export interface DesignImageUploadPack{
    uploadedMainImageSource:string,
    uploadedThumbImageSource:string,
}

export interface SizePass{
    status:boolean,
    limit:number,
    size:number
}

export interface DesignUpdatePatterns{
    
       MAIN_ONLY: string,
       THUMBNAIL_ONLY: string,
       MAIN_AND_THUMB:string
     
}



export interface ValidMappedDesignInage{
    main:string,
    thumbnail:string,
    mapped:boolean,
    mappedWith:string,
    onlyImagePath:string
}

