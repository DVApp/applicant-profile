import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import SkilsList from './skils';
import { useContext, useState } from 'react';
import { ProfileContext } from '../App';

function ProfileModal(props) {
    const { setUserData, userData } = useContext(ProfileContext);
    const { show, closePopup } = props
    const [skliList, applySkills] = useState([])

    const handleClose = () => {
        closePopup(false)
    }
    const getData = (data) => {
        applySkills(data)
    }
   
    const saveSkills = () => {
        closePopup(false)
        setUserData([...skliList])
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg' backdrop='static'>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={4}><img alt='Avatar' style={{ width: '100%', height: '100%' }} variant="top" src={userData.avatar} /></Col>
                            <Col xs={8}>

                                <SkilsList saveData={getData} ></SkilsList>

                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" className={skliList.length === 0 ? 'disabled' : ''} disabled={skliList.length === 0} onClick={() => saveSkills()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ProfileModal;