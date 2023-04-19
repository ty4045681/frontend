const TestPage = () => {
    const eventHandler = () => {
        console.log("Clicked")
    }
    return (
        <div onClick={eventHandler}>
            <button id="myButton" disabled>Click me</button>
        </div>
    )
}

export default TestPage