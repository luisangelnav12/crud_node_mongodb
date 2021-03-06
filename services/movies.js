
const MongoLib=require('../lib/mongo')

class MoviesService{
constructor(){
    this.collection='movies';
    this.mongoDB=new MongoLib();
}
    async getMovies({ tags }={}) {
        const query= tags  && { tags: { $in: tags }};
        const movies=await this.mongoDB.getAll(this.collection,query);
        return movies || [];
    }
    async getMovie({movieId}) {
        const movie=await this.mongoDB.get(this.collection,movieId);
        return movie || {};
    }
    async createMovie({ movie }) {
        const createMoviesId=await this.mongoDB.create(this.collection,movie);
        return createMoviesId;
    }
    async updateMovie({movieId,movie}={}) {
        const updateMoviesId=await this.mongoDB.update(this.collection,movieId,movie);
        return updateMoviesId ;
    }
    async deleteMovie({movieId}) {
        const deleteMoviesId=await this.mongoDB.delete(this.collection,movieId);
        return deleteMoviesId ;
    }
}
module.exports=MoviesService;
