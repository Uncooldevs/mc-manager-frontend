import "./console.css"

function Console(props: { output: string }) {

    return <div className="console" >
        <textarea id="ta_console" readOnly={true} value={props.output}/>
        <input type="text" placeholder="Type command"/>
    </div>
}

export default Console
