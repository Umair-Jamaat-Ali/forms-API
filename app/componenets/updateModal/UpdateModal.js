import React from 'react'

export default function UpdateModal() {
  return (
    <>
      <div className="main_div">
        <div className="form">
          <div className="close_btn">
            {" "}
            <button onClick={onclose}>close</button>
          </div>
          <form onSubmit={update}>
            <div>
              <label htmlFor="">name</label>
              <input
                type="text"
                name="name"
                // value={formdata.name}
                // onChange={(e) => {
                //   setFormdata({ ...formdata, name: e.target.value });
                // }}
              />
            </div>
            <div>
              <label htmlFor="">lastname</label>
              <input
                type="text"
                name="last name"
                // value={formdata.email}
                // onChange={(e) => {
                //   setFormdata({ ...formdata, email: e.target.value });
                // }}
              />
            </div>

            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>

      {/* {loading ? <Loader /> : null} */}
    </>
  )
}
