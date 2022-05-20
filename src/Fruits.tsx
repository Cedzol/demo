import React, {useState} from 'react'
import "./fruit.css"

type Fruit = {
    name: string;
    image: string;
    price: number;
    weight?: number;
}

var fruits: Fruit[] = [
    {
        "name": "Apple",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
        "price": 35
    },
    {
        "name": "Banana",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg",
        "price": 12
    },
    {
        "name": "Grapes",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg",
        "weight": 0.1,
        "price": 45
    },
    {
        "name": "Pineapple",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg",
        "price": 200
    }
];


export default function Fruit() {
    let [fruitData, setFruitData] = useState(fruits)

    interface FormElements extends HTMLFormControlsCollection {
        name: HTMLInputElement
        image: HTMLInputElement
        price: HTMLInputElement
        weight?: HTMLInputElement

    }

    interface YourFormElement extends HTMLFormElement {
        elements: FormElements
    }

    const handleFormSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.elements.name.value)
        var newName: string = e.currentTarget.elements.name.value;
        var newImage: string = e.currentTarget.elements.image.value;
        var newPrice: number = parseFloat(e.currentTarget.elements.price.value);
        var newWeight: number | undefined = parseFloat(e.currentTarget.elements.weight?.value as string)

        let newFruit: Fruit = {
            name: newName,
            image: newImage,
            price: newPrice,
            weight: newWeight
        }
        setFruitData((fruitData) => [...fruitData, newFruit])
    }

    let [filteredFruits, setFilteredFruits] = useState(fruits)


    function handleFilter(event: { target: { value: string } }): void {
        const searchWord = event.target.value.toLowerCase();
        let newFilter = fruitData.filter((value) => {
            return Object.values(value).join("").toLowerCase().includes(searchWord);
        })
        setFilteredFruits(newFilter);
    }

    return (
        <div>
            <div className={"center"}>
                <div className={"limiter"}>
                    <div>
                        <input type={"text"} onChange={handleFilter} className={"search"} placeholder={"search"}/>
                    </div>
                    {filteredFruits.map((fruit) => {
                        return (<div className={"inlineFruit"}>
                                <div className="card">
                                    <div className={"cardSpace"}></div>
                                    <img src={fruit.image} className={"fruitImg"} alt={"Fruit Image"}/>
                                    <p>{fruit.name}</p>
                                    <p>price: {fruit.price}</p>
                                    <p className={"btmpad"}>weight: {fruit.weight}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={"toppad"}></div>
            <div className={"middle"}>
                <form onSubmit={handleFormSubmit}>
                    <table>
                        <tr>
                            <td>
                                <label>Fruit name</label>
                            </td>
                            <td>
                                <input id="name" name="name" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>image url</label>
                            </td>
                            <td>
                                <input id="image" name="image" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>price</label>
                            </td>
                            <td>
                                <input id="price" name="price" type="number"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>weight</label>
                            </td>
                            <td>
                                <input id="weight" name="weight" type="number" step="0.01"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" id={"submitButton"} className={"send"}>Send It!</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    )
}
