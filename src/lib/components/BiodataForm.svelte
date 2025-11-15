<script lang="ts">
	import type { BiodataForm } from '$lib/types/quiz';

	interface Props {
		biodata: BiodataForm;
		onNext: () => void;
	}

	let { biodata = $bindable(), onNext }: Props = $props();

	let errors = $state<{ nama?: string; nomorHP?: string }>({});

	function validateForm() {
		errors = {};

		if (!biodata.nama.trim()) {
			errors.nama = 'Nama harus diisi';
		}

		if (!biodata.nomorHP.trim()) {
			errors.nomorHP = 'Nomor HP harus diisi';
		} else if (!/^[\d\s\-\+\(\)]+$/.test(biodata.nomorHP)) {
			errors.nomorHP = 'Format nomor HP tidak valid';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (validateForm()) {
			onNext();
		}
	}
</script>

<div class="biodata-form">
	<h2>Biodata Pengunjung</h2>
	<form onsubmit={handleSubmit}>
		<div class="form-group">
			<label for="nama">Nama</label>
			<input
				type="text"
				id="nama"
				bind:value={biodata.nama}
				placeholder="Masukkan nama lengkap"
				class:error={errors.nama}
			/>
			{#if errors.nama}
				<span class="error-message">{errors.nama}</span>
			{/if}
		</div>

		<div class="form-group">
			<label for="nomorHP">Nomor HP</label>
			<input
				type="text"
				id="nomorHP"
				bind:value={biodata.nomorHP}
				placeholder="Contoh: 08123456789"
				class:error={errors.nomorHP}
			/>
			{#if errors.nomorHP}
				<span class="error-message">{errors.nomorHP}</span>
			{/if}
		</div>

		<button type="submit" class="btn-primary">Mulai Kuis</button>
	</form>
</div>

<style>
	.biodata-form {
		max-width: 480px;
		margin: 0 auto;
		padding: 2.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
	}

	h2 {
		color: #212529;
		margin-bottom: 1.5rem;
		text-align: center;
		font-weight: 600;
		font-size: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #495057;
		font-size: 0.9rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ced4da;
		border-radius: 6px;
		font-size: 1rem;
		transition: all 0.2s;
		background: #fff;
	}

	input:focus {
		outline: none;
		border-color: #495057;
		box-shadow: 0 0 0 3px rgba(73, 80, 87, 0.1);
	}

	input.error {
		border-color: #dc3545;
	}

	.error-message {
		display: block;
		margin-top: 0.5rem;
		color: #dc3545;
		font-size: 0.875rem;
	}

	.btn-primary {
		width: 100%;
		padding: 0.875rem;
		background: #212529;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-primary:hover {
		background: #343a40;
	}
</style>
