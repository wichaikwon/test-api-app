'use client'
import React, { useState } from 'react'
import Section from '../components/Section'

const Homepage: React.FC = () => {
  const [openModelCondition, setOpenModelCondition] = useState(true)
  const [openWanrantyCondition, setOpenWanrantyCondition] = useState(false)
  const [openMachineCondition, setOpenMachineCondition] = useState(false)
  const [openScreenCondition, setOpenScreenCondition] = useState(false)
  const [openTouchScreenCondition, setOpenTouchScreenCondition] = useState(false)
  const [openBatteryCondition, setOpenBatteryCondition] = useState(false)
  const [extensionCondition, setExtensionCondition] = useState(false)
  const [defectCondition, setDefectCondition] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string | string[]>('')
  const [selectedWanranty, setSelectedWanranty] = useState<string | string[]>('')
  const [selectedMachineCondition, setSelectedMachineCondition] = useState<string | string[]>('')
  const [selectedScreenCondition, setSelectedScreenCondition] = useState<string | string[]>('')
  const [selectedTouchScreenCondition, setSelectedTouchScreenCondition] = useState<string | string[]>('')
  const [selectedBatteryCondition, setSelectedBatteryCondition] = useState<string | string[]>('')
  const [selectedExtension, setSelectedExtension] = useState<string | string[]>('')
  const [selectedDefectCondition, setSelectedDefectCondition] = useState<string | string[] | string[]>([])

  return (
    <div className="">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-slate-100 p-2">
        <Section
          title="Model"
          state={openModelCondition}
          setState={setOpenModelCondition}
          selected={Array.isArray(selectedModel) ? selectedModel.join(', ') : selectedModel}
          setSelected={(value) => {
            setSelectedModel(value)
            setOpenWanrantyCondition(true)
          }}
          options={['เครื่องไทย TH', 'Model ZP 14,15,16 Series', 'เครื่องนอกโมเดลอื่น']}
        />
        <Section
          title="Warranty"
          state={openWanrantyCondition}
          setState={setOpenWanrantyCondition}
          selected={selectedWanranty}
          setSelected={(value) => {
            setSelectedWanranty(value)
            setOpenMachineCondition(true)
          }}
          options={['ประกันเหลือมากกว่า 4 เดือน', 'ประกันเหลือน้อยกว่า 4 เดือน', 'หมดประกัน']}
        />
        <Section
          title="Machine"
          state={openMachineCondition}
          setState={setOpenMachineCondition}
          selected={selectedMachineCondition}
          setSelected={(value) => {
            setSelectedMachineCondition(value)
            setOpenScreenCondition(true)
          }}
          options={[
            'ไม่มีรอยขีดข่วน',
            'มีรอยนิดหน่อย รอยเคส',
            'มีรอยมาก ถลอก สีหลุด',
            'ตัวเครื่องมีรอยตก / เบี้ยว / แตก / งอ ',
            'ฝาหลัง / กระจกหลังแตก',
          ]}
        />
        <Section
          title="Screen"
          state={openScreenCondition}
          setState={setOpenScreenCondition}
          selected={selectedScreenCondition}
          setSelected={(value) => {
            setSelectedScreenCondition(value)
            setOpenTouchScreenCondition(true)
          }}
          options={['หน้าจอไม่มีรอย', 'หน้าจอมีรอยบางๆ', 'หน้าจอมีรอยสะดุด', 'หน้าจอมีรอยแตกชำรุด']}
        />
        <Section
          title="TouchScreen"
          state={openTouchScreenCondition}
          setState={setOpenTouchScreenCondition}
          selected={selectedTouchScreenCondition}
          setSelected={(value) => {
            setSelectedTouchScreenCondition(value)
            setOpenBatteryCondition(true)
          }}
          options={[
            'แสดงภาพหน้าจอปกติ',
            'จุด Bright / ฝุ่นในจอ / ขอบจอเงา',
            'จุด Dead / จุดสี / ลายเส้น / จอปลอม',
            'ไม่สามารถแสดงภาพหน้าจอ',
          ]}
        />
        <Section
          title="Battery"
          state={openBatteryCondition}
          setState={setOpenBatteryCondition}
          selected={selectedBatteryCondition}
          setSelected={(value) => {
            setSelectedBatteryCondition(value)
            setExtensionCondition(true)
          }}
          options={['แบตเตอรี่ มากกว่า 80%', 'แบตเตอรี่ ต่ำกว่า 80%']}
        />
        <Section
          title="Extension"
          state={extensionCondition}
          setState={setExtensionCondition}
          selected={selectedExtension}
          setSelected={(value) => {
            setSelectedExtension(value)
            setDefectCondition(true)
          }}
          options={['มีกล่อง / อุปกรณ์ครบ', 'มีกล่อง / อุปกรณ์ไม่ครบ', 'ไม่มีกล่อง']}
        />
        <Section
          title="Defect (select more 1 choice)"
          state={defectCondition}
          setState={setDefectCondition}
          selected={selectedDefectCondition}
          setSelected={(value) => {
            setSelectedDefectCondition(value)
          }}
          options={[
            'ระบบสัมผัส',
            'wifi Bluetooth GPS',
            'ระบบสั่น',
            'โทรออก, รับสาย มีปัญหา',
            'สแกนนิ้ว, Face Scan',
            'ปุ่มHomeมีปัญหา',
            'ลำโพงบน ล่าง',
            'กล้องหน้า หลัง แฟลช',
            'Sensor',
            'ปุ่มล็อก power volume',
            'ไม่มีปัญหา',
          ]}
          isMultiSelect={true}
        />
      </div>
    </div>
  )
}

export default Homepage
