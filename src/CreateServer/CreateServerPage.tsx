import {Link} from "react-router-dom";
import {Button, TextField, Select, MenuItem, Accordion, Alert, Dialog, AccordionSummary} from "@mui/material";
import {useState} from "react";
import {default_ip} from "../utils/globals";

enum LevelTypes {
    DEFAULT = "normal",
    FLAT = "flat",
    LARGE_BIOMES = "large_biomes",
    AMPLIFIED = "amplified"
}

interface WorldGenerationSettings {
    level_seed: string;
    level_type: string;
    generate_structures: boolean;
}

interface CreateModel {
    name: string
    version: string
    world_generation_settings?: WorldGenerationSettings
}

function CreateServerPage() {
    const [err_text, set_err_text] = useState("");
    const [info_text, set_info_text] = useState("");
    const [world_generation_settings, set_world_generation_settings] = useState<WorldGenerationSettings>({
        generate_structures: true, level_seed: "", level_type: "normal"
    })
    const [model, set_data] = useState<CreateModel>(
        {
            name: "", version: "latest",
            world_generation_settings: world_generation_settings
        });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const name = event.target.name
        const value = event.target.value
        set_data(values => ({...values, [name]: value}))
    }

    const handleWorldGeneratorChange = (event: { target: { name: any; value: any; }; }) => {
        const name = event.target.name
        const value = event.target.value
        set_world_generation_settings(values => ({...values, [name]: value}))
    }

    function create_server() {
        if (model.name === "") {
            set_err_text("Name cannot be empty")
            return
        }

        fetch(default_ip + "/servers", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(model)

        }).then(response => {
            if (response.status == 200) {
                set_info_text("Server created successfully!")
            }
        }).catch((err) => {
                console.log(err)
                set_err_text(err)
            }
        )
    }

    return <div>
        <h1>Create Server</h1>
        <Link to={"/"}><Button variant="contained">Back</Button></Link>

        <form>
            <TextField label="Name" variant="outlined" onChange={handleChange}
                       value={model.name} name="name" placeholder="My Server" required={true}/>
            <Select label="Version" variant="outlined" value={model.version}
                    onChange={handleChange} name="version">
                <MenuItem value="latest">latest</MenuItem>
                <MenuItem value="1.19.2">1.19.2</MenuItem>

            </Select>

            <Accordion title="World Generation">
                <AccordionSummary
                    aria-controls="panel-candidates-content"
                    id="panel-candidates-header"
                >World Generation
                </AccordionSummary>
                <TextField label="Seed" variant="outlined" onChange={handleWorldGeneratorChange}
                           value={world_generation_settings.level_seed}
                           name="level_seed" placeholder="Seed"/>
                <Select label="Type" variant="outlined" value={world_generation_settings.level_type}
                onChange={handleWorldGeneratorChange} name={"level_type"}>
                    {
                        Object.values(LevelTypes).map((item:string)=>{
                            return <MenuItem value={item}>{item}</MenuItem>
                        })
                    }

                </Select>
            </Accordion>

            <Button variant="contained" onClick={create_server}>Create</Button>
        </form>
        <Dialog open={err_text != ""} onClose={() => {
            set_err_text("")
        }}>
            <Alert severity="error">{err_text}</Alert>
        </Dialog>
        <Dialog open={info_text != ""} onClose={() => {
            set_info_text("")
            window.location.href = "/"
        }}>
            <Alert severity="success">{info_text}</Alert>
        </Dialog>
    </div>;
}

export default CreateServerPage;
