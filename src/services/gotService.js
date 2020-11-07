export default class GotService{
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource (url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    async getAllCharacters(){
        const res =  await this.getResource("/characters/");
        return res.map(this._transformCharacter);
    }
    async getCharacter(id){
        const char  = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);

    }


   async getAllBooks(){
        const res = await this.getResource("/books/");
        return res.map(this._transformBook);
    }
    async getBook(id){
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);

    }


    async getAllHouses(){
        const res = await this.getResource("/houses/");
        return res.map(this._transformHouse);
    }
    async getHouse(id){
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);

    }

    _transformCharacter(char){
        if(char.born == ''){
            char.born = "this information is lost";
        }
        if(char.died == ''){
            char.died = "this information is lost";
        }
        if(char.culture == ''){
            char.culture = "this information is lost";
        }
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book){
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released

        }
    }
}




