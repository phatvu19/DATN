import { Select } from 'antd'
import React from 'react'
import UserIntopUser from './UserIntopUser'

type Props = {}

const TopUser = (props: Props) => {
  return (
    <>
          <div>
              <div className="bg-gray-200 p-4 flex ">
                  <span className="font-bold">Top người dùng</span>
              </div>
              <UserIntopUser />
          </div>
    </>
  )
}

export default TopUser