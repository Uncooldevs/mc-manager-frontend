import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export class TabEntry {
    label: string
    content: JSX.Element

    constructor(label: string, content: JSX.Element) {
        this.label = label
        this.content = content
    }
}

export default function SideTabBarWithBack(props: { tabs: TabEntry[] }) {
    const [value, setValue] = React.useState(1);
    const nav = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if(newValue === 0) {
            nav('/', {replace: false})
            return
        }
        setValue(newValue);
    };

    return (
        <Box
            sx={{flexGrow: 1, display: 'flex', height: 224}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Back" {...a11yProps(0)} />
                {props.tabs.map((tab, index) =>
                    <Tab label={tab.label} {...a11yProps(index + 1)} />)}
            </Tabs>

            {
                props.tabs.map((tab, index) =>
                    <TabPanel index={index + 1} value={value}>{tab.content}</TabPanel>)
            }


        </Box>
    );
}
