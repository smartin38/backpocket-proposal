import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Panel, PanelGroup, Grid, Col, Row } from 'rsuite';

import DashboardHeader from "../dashboard/DashboardHeader"
import DashBoardSideBar from "../dashboard/DashboardSideBar"

const MemoriesLog = () => {

    const user = useSelector((state) => state.user)

    const [memoriesArray, setMemoryList] = useState([])

    const getMemoriesList = () => {
        let token = localStorage.getItem("token");
        fetch(`http://localhost:3000/memories_list/${user.id}`, {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((list) => {
                console.log('list of Memories', list)
                setMemoryList(list)
            })

    }

    useEffect(() => {
        getMemoriesList();
    }, []);


    const [activeKey, setActiveKey] = useState('1');
    const [openKeys, setOpenKeys] = useState(['3', '4']);
    const [expanded, setExpand] = useState(true);

    return (
        <>
            <Grid fluid>
                <DashboardHeader
                    appearance="subtle"
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                />
                <br>
                </br>
                <Row>
                    <Col xs={8}>
                        <DashBoardSideBar
                            activeKey={activeKey}
                            openKeys={openKeys}
                            onOpenChange={setOpenKeys}
                            onSelect={setActiveKey}
                            expanded={expanded}
                            onExpand={setExpand}
                            appearance="subtle"
                        />
                    </Col>
                    <Col xs={8}>
                        <Panel>
                            <h1 className="log-title">Memories Log</h1>
                        </Panel>
                            {memoriesArray.map((memory, index) => {
                            return (
                                <PanelGroup accordion bordered>
                                    <Panel
                                        key={index}
                                        className="panel"
                                        header={<h2>[{index + 1}] {memory.name}</h2>}
                                    >
                                        <h3>description: </h3>
                                        <h3>{memory.description}</h3>                                    
                                    </Panel>
                                </PanelGroup>
                            );
                        })}
                    </Col>
                </Row>
            </Grid>
        </>
    )
}

export default MemoriesLog;