import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchForm({ params, onParamsChange }) {
    return (
        <div>
            <Form className="mb-4">
                <Form.Row className="align-items-end">
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={onParamsChange} value={params.description} name="description" type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control onChange={onParamsChange} value={params.location} name="location" type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Check className="ml-2" xs="auto" onChange={onParamsChange} value={params.full_time}
                            name="full_time" id="full_time" label="Only Full Time" type="checkbox" className="mb-2" />
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
    )
}
