import React from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input } from 'antd';

const johnId = 'b108b49c-08e2-4613-b2af-db13c7f2a5c7';
const janeId = '9cb25f1c-1f85-4f9b-b424-818e288a26e2';
const people = {
    [johnId]: {
        name: 'John Doe',
        email: 'john.doe@example.com',
    },
    [janeId]: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
    },
};

const tableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '',
        dataIndex: 'edit',
        key: 'edit',
    }
];

const tableDataSource = [
    {
        ...people[janeId],
        key: janeId,
        edit: <Link to={`/edit/${janeId}`}><Button>Edit</Button></Link>,
    },
    {
        ...people[johnId],
        key: johnId,
        edit: <Link to={`/edit/${johnId}`}><Button>Edit</Button></Link>,
    },
];

function DrawerFooter({ onClose }) {
    return (
        <div style={{textAlign: 'right'}}>
            <Button onClick={onClose} type="primary">
                Save
            </Button>
        </div>
    );
}

function EditDrawer({ visible, person, history }) {
    // make sure we don't break anything if person is `null` (no matched URL)
    if (!person) {
        person = {
            email: '',
            name: '',
        };
    }

    const onClose = () => history.push('/');

    // form here doesn't actually work, form is not the point of the tutorial.
    return (
        <Drawer visible={visible} footer={<DrawerFooter onClose={onClose} />} onClose={onClose} width={512}>
            <Form layout="vertical">
                <Form.Item label="Email">
                    <Input value={person.email} />
                </Form.Item>
                <Form.Item label="Name">
                    <Input value={person.name} />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

const EditDrawerWithRouter = withRouter(EditDrawer);


export default function App() {
    return (
        <BrowserRouter>
            <div style={{padding: '2rem'}}>
                <Table dataSource={tableDataSource} columns={tableColumns} />
                <Route path="/edit/:id">{({ match }) => (
                    <EditDrawerWithRouter
                        visible={match !== null}
                        person={match ? people[match.params.id] : null}
                        />
                )}</Route>
            </div>
        </BrowserRouter>
    );
}
