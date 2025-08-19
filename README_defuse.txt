What's New?
-----------------
- Generate binary zip periodical with latest minute/stroopwafel releases

INSTALLATION INSTRUCTIONS
-------------------------

REQUIRED FILES
--------------
- boot1.img --  SD card image for minute_minute
- boot1_slccmpt.img --  NAND-flashable minute boot1, for using >2GiB SD cards
- fw.img    --  Main bootloader, minute
- wiiu/ios_plugins/00core.ipx --  Stroopwafel core, this plugin loads first and bootstraps all other plugins in wiiu/ios_plugins.
- wiiu/ios_plugins/5debug.ipx -- Stroopwafel plugin to enable full IOSU debug output
- otp.bin   --  This can be dumped via the minute menu, under 
              `Backup and Restore` > `Dump OTP via PRSHhax`. 
              The menu will still be available if otp.bin is not present, 
              however IOS will not be able to boot.

**You can download everything here: [binary release](https://github.com/mackieks/isfsh.ax/raw/refs/heads/main/defuse_release.zip)**
              
The following projects are provided in the zip:
- [stroopwafel](https://github.com/shinyquagsire23/stroopwafel)
- [minute_minute](https://github.com/shinyquagsire23/minute_minute)

STEPS
-----
1) Flash pico_defuse.uf2 to the Raspberry Pi Pico via USB. This can be done by copying the file to the USB Mass Storage device that appears.

2) Flash boot1.img to a 1GB SD card. Some 2GB cards may work, but 1GB seems to be the sweet spot--it just has to be non-SDHC. boot1.img includes an MBR header, so you may have to format the FAT32 partition after flashing in order to continue. Flashing can be done via win32diskimager, dd, or any other SD card formatter.

3) Copy the content of the sd folder and the otp.bin to the root of the SD card. If you do not have otp.bin, it can be dumped via `Backup and Restore` > `Dump OTP via PRSHhax`.

4) Power on the Wii U console. If it is working correctly, the power LED will flash and turn purple. By default, the minute menu will appear on the serial console, however an INI file can be placed on the SD card to trigger autobooting.

Your SD card file structure should contain the following, or it will not boot:
```
sdmc:/
├── fw.img
└── wiiu
    └── ios_plugins
        └── 00core.ipx
        └── 5debug.ipx
```

A brief purple flash followed by a blinking orange LED means that fw.img was not found on the SD card root.

ACCESSING THE MINUTE MENU
-------------------------
A serial console is required to operate the menu, for now. On Windows you can use PuTTY, on Linux/macOS you can use minicom (eg `minicom -b 115200 -o -D /dev/cu.usbmodem11101`).

minute can be configured to autoboot into IOS via sdmc:/minute/minute.ini. To trigger the menu manually, press (but do not hold) the power button 3-5 times (like you're trying to get into the BIOS on a computer), or until the menu shows up on the serial console. From here you can swap the SD card and make NAND backups. To back up MLC, it is currently recommended to Format redNAND with a 64GB SD card, and then copy the partitions off the SD card.

An example of an autoboot minute.ini is as follows:
```
[boot]
autoboot = 1
autoboot_timeout = 3
```

RESTORING NAND BACKUPS
----------------------
minute now supports restoring NAND backups, however there still *may* be some lingering bugs. AS LONG AS YOU HAVE A KNOWN-GOOD SLC.RAW and SLCCMPT.RAW BACKED UP SOMEWHERE SAFE, YOU WILL BE FINE!! I managed to completely wipe my SLCCMPT and restore it, but I also had one restore where some sectors didn't program for some reason. It could have just been my SD card though.

I plan on continuing to work on this, since I also want to recover a unit which has had its NAND entirely wiped with no backups. However, the current state of things is as I said.

A corrupt NAND will look as follows in IOSU logs:
- "Attached volume to slc01 (raw)"
- "Attached volume to slccmpt01 (raw)"
- A ton of spam about bad hashes (this also happens if otp.bin is invalid or zeroed).

REDNAND
-------
RedNAND can be configured using sdmc:/minute/rednand.ini. If you have an older redNAND (de_Fuse 0.7 or so), you can use the following INI file:
```
[partitions]
slccmpt=true
slc=true
mlc=true

[scfm]
disable=false
allow_sys=false

[disable_encryption]
mlc=false
```

GPU OVERCLOCKING
---------------------
minute has experimental support for overclocking (or underclocking) the Radeon GPU by specifying PLL parameters in the ini file. **This can potentially harm your Wii U if you don't check your math!** Or your Wii U will just not boot into the menu or may otherwise become unstable in normal usage.

Manual PLL overrides overview:
```
div_select = ?
clkV is spread spectrum related maybe?
clkS is clock source...?

clkXtal = 27MHz
clkO = clkO0Div, clkO1Div, or clkO2Div (based on div_select)
clkF = (clkFMsb << 16) | (clkFLsb << 1)
freqMhz = clkXtal * (clkF/0x10000) / (clkR+1) / (clkO/2)
```

Example unmodified INI values:
```
; Defaults:
; GPU = 544.999878MHz
; 27 * (0x285ED0 / 0x10000) / (0+1) / (0x4/2)
[clocks]
gpu_clk_r = 0x0
gpu_clk_f = 0x285ED0
gpu_clk_s = 0x1C2
gpu_clk_v = 0x7
gpu_clk_o_0div = 0x4
gpu_clk_o_1div = 0x4
gpu_clk_o_2div = 0x0
```

Example overclock:
```
; GPU = 679.999878MHz (1.25x)
; 27 * (0x325ED0 / 0x10000) / (0+1) / (0x4/2)
[clocks]
gpu_clk_f = 0x325ED0
```

The GPU gets unstable at around 770MHz in my testing.

TROUBLESHOOTING
---------------
You will want a serial console connected for this, see above for help.

If the console LED stays red after pressing the power button, and then boots normally after ~30s, this means that either de_Fuse failed to detect success, or the SD card was invalid.

A successful de_Fuse looks like this:

```
[pico] Changed state: WIIU_STATE_POWERED_OFF -> WIIU_STATE_NEEDS_DEFUSE
Starting... 1152
Results:
Winner! 0xfb80
01
02
03
04
05
08
09
0a
0b
0c
0d
0e
13
14
15
18
1b
1c
1d
1e
1f
25
88
89
8a
...
```

- If the initial lines are not 01, 02, 03, ..., this means the DEBUG GPIOs are not wired correctly.
- If the final line is 0x1E and the error code is 0x00, that is an invalid SD card. Invalid SD cards seem to hang boot0.
- If the final line is 0x25, and 1e and 1f are in the output, this means the SD card was valid, but not flashed correctly (or otherwise failed to read).
- If the final line is 0x25, and 1e and 1f are NOT in the output, this means that the EXI CLK wire is not connected correctly, or there is an issue with the EXI data wire.
- A brief purple flash means that the custom boot1 has loaded, and glitching was successful. If it stays solid purple, then it has loaded fw.img from the SD card.
- A brief purple flash followed by a blinking orange LED means that fw.img was not found on the SD card root, or the SD card failed to mount.
