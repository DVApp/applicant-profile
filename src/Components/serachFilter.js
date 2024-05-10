import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const SearchFilter = ({ onChange, type }) => {
    return (
        <Row className='mb-2'>
            <Col>
                <Form.Select onChange={onChange} name='type'
                    size="sm">
                    <option>Select Type</option>
                    <option value="1">Skill</option>
                    <option value="2">Rating</option>
                </Form.Select>
            </Col>
            <Col>
                <Form.Control
                    size='sm'
                    disabled={!type}
                    type="text"
                    name="value"
                    onChange={onChange}
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                />
            </Col>
        </Row>
    )
}
export default SearchFilter;