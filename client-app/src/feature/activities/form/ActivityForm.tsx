import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({
    activity: selectedActivity, 
    closeForm,
    createOrEdit,
    submitting}:Props) {

    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(intialState);

    function handleSubmit() {
        createOrEdit(activity);        
    }

    function handInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handInputChange} /> 
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>        
    )
}