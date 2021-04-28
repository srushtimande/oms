import _ from 'lodash'

                    //allMovies     //1     //4
export function paginate(items,pageNumber,pageSize){

    const startIndex = (pageNumber - 1) * pageSize;

    return _(items)
            .slice(startIndex)
            .take(pageSize)
            .value()
}