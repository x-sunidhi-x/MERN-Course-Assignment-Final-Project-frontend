import { useState } from "react"
import Axios from "axios"
import * as Components from "./Components"
import DeleteAccountFormMobile from "./DeleteAccountFormMobile"
import DeleteAccountParticle from "./DeleteAccountParticle"

const DeleteAccountMobile = () => {
  const [DeleteFailed, setDeleteFailed] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = {
      password: userDetails.password,
    }
    Axios.post("http://localhost:8000/user-edit/delete-user", data, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        if (res.data.status === 500) {
          console.log(res.data.error)
          setDeleteFailed(true)
        } else {
          window.location.href = "/"
        }
      })
      .catch((err) => console.log(err))
    event.target.reset()
  }
  return (
    <>
      <DeleteAccountParticle />
      <Components.Container>
        <Components.ContainerMobile>
          <Components.Form onSubmit={handleSubmit}>
            <DeleteAccountFormMobile
              setState={setUserDetails}
              failed={DeleteFailed}
            />
          </Components.Form>
        </Components.ContainerMobile>
      </Components.Container>
    </>
  )
}

export default DeleteAccountMobile
