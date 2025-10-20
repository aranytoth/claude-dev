<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => env('ADMIN_NAME', 'Admin'),
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'admin123')),
            'role' => 'admin',
        ]);

        // Create default category
        Category::create([
            'name' => 'Uncategorized',
            'slug' => 'uncategorized',
            'description' => 'Default category for posts',
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin Email: ' . env('ADMIN_EMAIL', 'admin@example.com'));
        $this->command->info('Admin Password: ' . env('ADMIN_PASSWORD', 'admin123'));
    }
}
