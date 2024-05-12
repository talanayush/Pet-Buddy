import Card from "./Card";

export default function PetTypes(){
    return(
        <>
            <div className=" flex justify-between pl-10 pr-10">
                <Card content={"DOGS"} />
                <Card content={"CATS"} />
                <Card content={"RABITS"} />
                <Card content={"RODENTS"} />
            </div>
        </>
    );
}