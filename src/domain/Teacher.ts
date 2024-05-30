class Teacher {
    id: string;
    name: string;
    profession: string[];
    image: string;
    description: string;
    tags: string[];
    from: Date;

    constructor(id: string, name: string, profession: string[], image: string, description: string, tags: string[], from: Date) {
        this.id = id;
        this.name = name;
        this.profession = profession;
        this.image = image;
        this.description = description;
        this.tags = tags;
        this.from = from;
    }
}

export default Teacher;