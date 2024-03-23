
export const bootText : string =
 ` <div class="flex flex-col">
     <div class="pl-16">
      DMA [mem 0x0000000000001000-0x0000000000ffffff]
      <br />
      Normal [mem 0x0000000100000000-0x00000001f5ffffff]
      <br />
      -Kernel command line: BOOT_IMAGE=/boot/vmlinuz-6.8.1-amd64
      root=UUID=xxxxxxxx-xxxx-xxxx-XXXX-XXXXXXXXXxxx ro quiet splash
      <br />
      -Dentry cache hash table entries: 2097152 (order: 12, 16777216 bytes,
      linear)
      <br />
      -SLUB: HWalign=64, 0rder=0-3, MinObjects=0, CPUs 8, Nodes=1
      <br />
      -Preemptible hierarchical RCU implementation.
      <br />
      -RCU restricting CPUs from NR_CPUS=512 to nr_cpu_ids=8.
      <br />
      -RCU: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=8 NR_IRQS:
      524544, nr_irqs: 488, preallocated irqs: 16
      <br />
      -rcu: Preemptible hierarchical RCU implementation.
      <br />
      -rcu: RCU dyntick-idle grace-period acceleration is enabled.
      <br />
      -rcu: RCU restricting CPUs from NR_CPUS=512 to nr_cpu_ids=8.
      <br />
      -Trace version 1.0 enabled for kernel
      <br />
      -x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
      <br />
      -x86/fpu: xstate_offset[2]: 576, xstate_sizes [2]: 256
      <br />
      -x86/fpu: Enabled xstate features 0x1f, context size is 832 bytes, using
      'standard' format.
      <br />
      -Using ACPI (MADT) for SMP configuration information
      <br />
      -smpboot: Allowing 8 CPUs, O hotplug CPUS
      Initialising file system...
      </div>
Setting hostname...<br/>
Starting system message bus...<br/>
Starting cron job...<br/>
Starting system log daemon...<br/>
Starting services...<br/>
    </div>
  `