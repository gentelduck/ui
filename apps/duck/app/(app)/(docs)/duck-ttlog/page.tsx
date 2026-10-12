import { Cpu, FileArchive, Gauge, Layers, ShieldAlert, Zap } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Logging that never blocks'
const description =
  'A fast, low-allocation logging framework for Rust. Lock-free ring buffer, compile-time macros, and snapshots that survive a crash.'

const features: IPackageFeature[] = [
  {
    description:
      '`info!`, `debug!`, `warn!`, and `error!` do most of their work at expansion time. At runtime, a log call is a ring-buffer write.',
    icon: Zap,
    title: 'Compile-time macros',
  },
  {
    description:
      'Log calls never block. Events land in an in-memory ring buffer, and a writer thread drains it in the background.',
    icon: Cpu,
    title: 'Lock-free ring buffer',
  },
  {
    description:
      'Repeated messages, file paths, module paths, and keys are stored once. Memory stays flat under sustained load.',
    icon: Layers,
    title: 'String interning',
  },
  {
    description: 'Stdout, file, and network listeners run on their own thread. Your code never waits on logging IO.',
    icon: Gauge,
    title: 'Separate listeners',
  },
  {
    description: 'Recent events flush to a compressed snapshot on disk whenever you ask, and on panic or SIGTERM.',
    icon: FileArchive,
    title: 'Snapshots',
  },
  {
    description:
      'A panic hook and a signal handler write a snapshot before the process exits. Post-mortems start with the last N events.',
    icon: ShieldAlert,
    title: 'Crash capture',
  },
]

const INSTALL_CODE = `// Add to Cargo.toml
[dependencies]
ttlog = "0.2"

// Use it
use ttlog::{Trace, info};

Trace::init();
info!("hello from ttlog");`

export default function DuckTtlogPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-ttlog/introduction', label: 'Get started' },
        { href: '/duck-ttlog/core', label: 'Core engine' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Add it to Cargo.toml, init once, and log from anywhere.' }}
      packageName="ttlog"
      slug="duck-ttlog"
      title={title}
    />
  )
}
