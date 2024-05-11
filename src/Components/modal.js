import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import SkilsList from './skils';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../App';

function ProfileModal(props) {
    const { setUserData, userData } = useContext(ProfileContext);
    const [isDisable, setDisable] = useState(true)
    const { show, closePopup } = props
    const [skliList, applySkills] = useState([])

    /** Close modal */
    const handleClose = () => {
        closePopup(false)
    }

    useEffect(() => {
        if (userData && userData.list.length == 0)
            setDisable(true)
        else if (skliList.length == 0)
            setDisable(true)
        else
            setDisable(false)
    }, [props])

    /** disabled save changes button based on skils data  */
    const formValidate = (formData) => {
        const checkValidate = formData.some((item) => { return item.skil == "" || item.rating == "" })
        if (checkValidate) {
            setDisable(true)
        } else if (skliList.length == 0) {
            setDisable(true)
        } else if (formData.length !== skliList.length) {
            setDisable(true)
        } else {
            setDisable(false)
        }

    }

    /** Apply functionality */
    const getData = (data) => {
        setDisable(false)
        applySkills(data)
    }

    /** Save changes functionality */
    const saveSkills = () => {
        closePopup(false)
        userData.list = skliList
        setUserData(userData)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg' backdrop='static'>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={4}><img alt='Avatar' style={{ width: '100%', height: '100%' }} variant="top" src={userData.avatar} /></Col>
                            <Col xs={8}>

                                <SkilsList checkValid={formValidate} saveData={getData} ></SkilsList>

                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" className={isDisable ? 'disabled' : ''} disabled={isDisable} onClick={() => saveSkills()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ProfileModal;