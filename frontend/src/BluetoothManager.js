const DOTS_SERVICE_UUID = "fc2d7374-8a34-4927-88fd-d85d70c3f361";
const DOTS_CHARACTERISTIC_UUID = "fc2d7374-8a34-4927-88fd-d85d70c3f362";

class BluetoothManager {
  device = null;
  server = null;
  characteristic = null;

  async connect(auto = false) {
    try {
      if (auto) {
        const devices = await navigator.bluetooth.getDevices();
        const knownDevice = devices.find((d) =>
          d.uuids.includes(DOTS_SERVICE_UUID)
        );
        if (!knownDevice) {
          console.warn("⚠️ No previously paired device found");
          return;
        }
        this.device = knownDevice;
      } else {
        this.device = await navigator.bluetooth.requestDevice({
          filters: [{ services: [DOTS_SERVICE_UUID] }],
        });
      }

      this.server = await this.device.gatt.connect();
      const service = await this.server.getPrimaryService(DOTS_SERVICE_UUID);
      this.characteristic = await service.getCharacteristic(DOTS_CHARACTERISTIC_UUID);
      console.log("✅ Bluetooth connected");
    } catch (error) {
      console.error("❌ Bluetooth connection failed:", error);
    }
  }

  async sendLetter(letter) {
    if (!this.characteristic) {
      console.warn("Characteristic not available, reconnecting...");
      await this.connect();
    }

    try {
      const encoder = new TextEncoder();
      const value = encoder.encode(letter);
      await this.characteristic.writeValue(value);
      console.log("📨 Sent letter:", letter);
    } catch (error) {
      console.error("❌ Failed to send letter:", error);
    }
  }
}

export default new BluetoothManager();
