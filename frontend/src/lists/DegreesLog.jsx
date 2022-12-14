import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { List, Panel, PanelGroup, Grid, Col, Row, Container } from 'rsuite';

import DashboardHeader from "../dashboard/DashboardHeader"
import DashBoardSideBar from "../dashboard/DashboardSideBar"

const DegreesLog = () => {

    const user = useSelector((state) => state.user)

    const [degreesArray, setdegreeList] = useState([])

    const getDegreesList = () => {
        let token = localStorage.getItem("token");
        fetch(`http://localhost:3000/degrees_list/${user.id}`, {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((list) => {
                console.log('list of Degrees', list)
                setdegreeList(list)
            })

    }

    useEffect(() => {
        getDegreesList();
    }, []);

    const styles = {
        display: 'inline-table'
    }

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
                    <Col sm={24} md={8} lg={6}>
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
                    <Col sm={12} md={8} lg={12}>
                        <Panel>
                            <h1 className="log-title">Degrees Log</h1>
                        </Panel>
                            {degreesArray.map((degree, index) => {
                                return (
                                    <PanelGroup accordion bordered>
                                        <Panel
                                            key={index}
                                            className="panel"
                                            header={<h2>[{index + 1}] {degree.name}</h2>}
                                        >
                                            <h3>level: {degree.level}</h3>
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

export default DegreesLog;